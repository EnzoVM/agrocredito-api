import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"
import CreditRequestList from "../../credit-request/domain/credit.request.list.model"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
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
      const totalPaymentsFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({ creditRequestId: creditRequest.campaignId })

      const amountDelivered = deliveries.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
      const interest = (campaignFound!.campaignInterest / 100) * creditRequest.creditAmount
      const delinquentInterest = (campaignFound!.campaignDelinquentInterest / 100) * creditRequest.creditAmount
      const totalPayment = totalPaymentsFound.reduce((accum, payment) => accum + payment.paymentAmount, 0)

      return {
        creditRequestId: creditRequest.creditRequestId,
        farmerId: creditRequest.farmerId,
        fullNames: creditRequest.fullNames,
        socialReason: creditRequest.socialReason,
        totalDelivery: amountDelivered,
        totalInterest: interest + delinquentInterest,
        capital: amountDelivered + interest + delinquentInterest - totalPayment
      }
    })

    const creditRelations: CreditRelation[] = await Promise.all(promises)

    return  {
      creditRelations,
      count: finalCount
    }
  }
}