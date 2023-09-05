import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import { esMayorLaFecha, getDateFormat, interesGeneral, interesMoratorio } from "../../../utils/interest"
import { Payment } from "../../account-status/domain/account.status.model"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"
import CreditRequestList from "../../credit-request/domain/credit.request.list.model"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import { CreditRequestStatusType } from "../../credit-request/domain/credit.request.status.type"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import { FarmerType } from "../../farmer/domain/farmer.type"
import PaymentPersistanceRepository from "../../payment/domain/payment.persistance.repository"
import CreditRelation from "../model/credit.relation.model"

export default class ListCreditRelationUseCase {
  constructor (
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository,
    private readonly paymentPersistanceRepository: PaymentPersistanceRepository
  ) {}

  async list (
    { 
      campaignId,
      farmerType,
      farmerFullNames,
      farmerSocialReason,
      page,
      limit
    }: {
      campaignId: string,
      farmerType: FarmerType, 
      farmerFullNames?: string, 
      farmerSocialReason?: string,
      page: number, 
      limit: number
    }
  ): Promise<{ creditRelations: CreditRelation[], count: number }> {
    if (
      typeof campaignId === 'undefined' ||
      typeof page === 'undefined' ||
      typeof limit === 'undefined'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
    }

    if (!Object.values(FarmerType).includes(farmerType)) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    let finalCount: number = 0
    let finalCreditRequest: CreditRequestList[] = []

    if (farmerType === FarmerType.INDIVIDUAL) {
      if (typeof farmerFullNames === 'undefined') {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
      }

      const { creditRequests, count } = await this.creditRequestPersistanceRepository.listCreditRequest({ campaignId, farmerType, farmerFullNames })

      finalCreditRequest = creditRequests
      finalCount = count
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      if (typeof farmerSocialReason === 'undefined') {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
      }
  
      const { creditRequests, count } = await this.creditRequestPersistanceRepository.listCreditRequest({ campaignId, farmerType, farmerFullNames })
  
      finalCreditRequest = creditRequests
      finalCount = count
    }

    if (farmerType === FarmerType.ALL) {
      const { creditRequests, count } = await this.creditRequestPersistanceRepository.listCreditRequest({ campaignId, farmerType })
  
      finalCreditRequest = creditRequests
      finalCount = count
    }

    if (limit > 0) {
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      finalCreditRequest = finalCreditRequest.slice(startIndex, endIndex)
    }

    const promises = finalCreditRequest.map(async creditRequest => {
      const deliveries = await this.deliveryPersistanceRepository.listDeliveriesByCreditRequestId({ creditRequestId: creditRequest.creditRequestId })
      const campaignFound = await this.campaignPersistanceRepository.getCampaignById(creditRequest.campaignId)
      const totalPaymentsFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({ creditRequestId: creditRequest.creditRequestId })

      if (!campaignFound) {
        throw new ProcessError({ message: 'La informacion no se pudo procesar debido a que no existe la campaña especificada', core: 'account-status' })
      }

      const payments: Payment[] = totalPaymentsFound.map(payment => {
        return {
          paymentAmount: payment.paymentAmount,
          transactionDateTime: payment.paymentDateTime
        }
      })

      const amountDelivered = deliveries.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
      const totalPayment = Number(payments.reduce((accum, payment) => accum + payment.paymentAmount, 0).toFixed(2))

      const totalPaymentsOutCampaignRange = payments.map(payment => {
        const dateFormat = getDateFormat(payment.transactionDateTime)
        const fechaFinalCampaña = `${campaignFound.campaignYear}-${campaignFound.finishDate.split('/').reverse().join('-')}`

        if (esMayorLaFecha(dateFormat, fechaFinalCampaña)) {
          return payment
        }
        else {
          return null
        }
      })
        .filter(payment => payment !== null)
        .reduce((accum, payment) => accum + payment!.paymentAmount, 0)

      const totalPaymentInCampaignRange = payments.map(payment => {
        const dateFormat = getDateFormat(payment.transactionDateTime)
        const fechaFinalCampaña = `${campaignFound.campaignYear}-${campaignFound.finishDate.split('/').reverse().join('-')}`
  
        if (esMayorLaFecha(dateFormat, fechaFinalCampaña)) {
          return null
        }
        else {
          return payment
        }
      })
        .filter(payment => payment !== null)
        .reduce((accum, payment) => accum + payment!.paymentAmount, 0)

      const interestCalculate = deliveries.map(delivery => {
        return interesGeneral({
          camaignYear: campaignFound.campaignYear,
          fechaReporte: new Date(),
          capital: delivery.deliveryAmount,
          porcentaje: campaignFound.campaignInterest,
          fechaEntrega: delivery.deliveryDateTime,
          finishDate: campaignFound.finishDate
        })
      })

      let interest = interestCalculate.reduce((accum, amount) => accum + amount, 0)

      const residualInterest = interest - totalPayment
      const finalResidualInterest = interest - totalPaymentInCampaignRange

      interest = residualInterest < 0 ? 0 : residualInterest

      const delinquentInterest = interesMoratorio({
        camaignYear: campaignFound.campaignYear,
        capital: amountDelivered + (finalResidualInterest > 0 ? 0 : finalResidualInterest),
        fechaReporte: new Date(),
        finishDate: campaignFound.finishDate,
        porcentaje: campaignFound.campaignDelinquentInterest
      })

      const finalDeliquentInterest = 
      delinquentInterest -
      totalPaymentsOutCampaignRange + 
      interestCalculate.reduce((accum, amount) => accum + amount, 0)
      
      const resta = (delinquentInterest > totalPaymentsOutCampaignRange) 
        ? 0
        : delinquentInterest - totalPaymentsOutCampaignRange


      const totalDelivery = Number((amountDelivered + (finalResidualInterest > 0 
        ? 0 
        : finalResidualInterest + resta)).toFixed(2))

      const finalDelinquentInterest = Number((finalDeliquentInterest > delinquentInterest 
        ? totalPaymentsOutCampaignRange > delinquentInterest 
          ? 0 
          : delinquentInterest - totalPaymentsOutCampaignRange
        : finalDeliquentInterest < 0 
          ? 0 
          : finalDeliquentInterest).toFixed(2))
        
      const isCreditRequestPayed = creditRequest.creditRequestStatus === CreditRequestStatusType.PAID
      
      return {
        creditRequestId: creditRequest.creditRequestId,
        farmerId: creditRequest.farmerId,
        fullNames: creditRequest.fullNames,
        socialReason: creditRequest.socialReason,
        totalDelivery: isCreditRequestPayed ? 0 : totalDelivery,
        interest: isCreditRequestPayed ? 0 : Number(interest.toFixed(2)),
        delinquentInterest: isCreditRequestPayed ? 0 : finalDelinquentInterest,
        capital: isCreditRequestPayed ? 0 : totalDelivery + finalDelinquentInterest + Number(interest.toFixed(2))
      }
    })

    const creditRelations: CreditRelation[] = await Promise.all(promises)

    return  {
      creditRelations,
      count: finalCount
    }
  }
}