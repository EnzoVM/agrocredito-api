import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import { interesGeneral, interesMoratorio } from "../../../utils/interest"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import { CreditRequestStatusType } from "../../credit-request/domain/credit.request.status.type"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import PaymentPersistanceRepository from "../../payment/domain/payment.persistance.repository"
import AccountStatusModel, { Payment } from "../domain/account.status.model"

export default class GetAccountStatusUseCase {
  constructor (
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository,
    private readonly paymentPersistanceRepository: PaymentPersistanceRepository
  ) {}

  async get ({ creditRequestId, take }: { creditRequestId: string, take?: number }): Promise<AccountStatusModel> {
    if (typeof creditRequestId === 'undefined') {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'account-status' })
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({ creditRequestId })

    if (!creditRequestFound) {
      throw new NotFoundError({ message: 'La solicitud de crédito especificada no existe', core: 'account-status' })
    }

    if (creditRequestFound.creditRequestStatus === CreditRequestStatusType.PENDING) {
      throw new ProcessError({ message: 'No se puede obtener el estado de cuenta debido a que la solicitud de crédito esta pendiende de aprobación', core: 'account-status' })
    }

    const deliveriesFound = await this.deliveryPersistanceRepository.listDeliveriesByCreditRequestId({ creditRequestId })

    const campaignFound = await this.campaignPersistanceRepository.getCampaignById(creditRequestFound.campaignId)

    if (!campaignFound) {
      throw new ProcessError({ message: 'La informacion no se pudo procesar debido a que no existe la campaña especificada', core: 'account-status' })
    }

    const paymentsToShowFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({ creditRequestId, take: take ? Number(take) : undefined })
    const totalPaymentsFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({ creditRequestId })

    const paymentsToShow: Payment[] = paymentsToShowFound.map(payment => {
      return {
        paymentAmount: payment.paymentAmount,
        transactionDateTime: payment.paymentDateTime
      }
    })

    const payments: Payment[] = totalPaymentsFound.map(payment => {
      return {
        paymentAmount: payment.paymentAmount,
        transactionDateTime: payment.paymentDateTime
      }
    })

    const amountDelivered = deliveriesFound.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
    const totalPayment = payments.reduce((accum, payment) => accum + payment.paymentAmount, 0)

    const interestCalculate = deliveriesFound.map(delivery => {
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

    interest = residualInterest < 0 ? 0 : residualInterest

    const delinquentInterest = interesMoratorio({
      camaignYear: campaignFound.campaignYear,
      capital: creditRequestFound.creditAmount - totalPayment,
      fechaReporte: new Date(),
      finishDate: campaignFound.finishDate,
      porcentaje: campaignFound.campaignDelinquentInterest
    })

    const amountDeliveredPercentage = (Math.round(((amountDelivered / creditRequestFound.creditAmount) + Number.EPSILON) * 100) / 100) * 100
    const finalDebt = (creditRequestFound.creditAmount + interestCalculate.reduce((accum, amount) => accum + amount, 0) + delinquentInterest) - totalPayment
    
    return {
      campaignFinishDate: `${campaignFound.finishDate}/${campaignFound.campaignYear}`,
      amountDelivered,
      amountDeliveredPercentage,
      finalDebt: Number(finalDebt.toFixed(2)),
      payments: paymentsToShow,
      deliveries: deliveriesFound.map(delivery => {
        return {
          deliveryAmount: delivery.deliveryAmount,
          deliveryDateTime: delivery.deliveryDateTime
        }
      }),
      capital: amountDelivered + (residualInterest > 0 ? 0 : residualInterest),
      interest: Number(interest.toFixed(2)),
      interesPercentage: campaignFound.campaignInterest,
      delinquentInterest,
      delinquentInterestPercentage: campaignFound.campaignDelinquentInterest,
      totalPayment,
      creditAmount: creditRequestFound.creditAmount,
      farmerData: {
        farmerId: creditRequestFound.farmerId,
        fullNames: creditRequestFound.farmerFullNames,
        socialReason: creditRequestFound.farmerSocialReason
      },
      campaignId: campaignFound.campaignId,
      creditRequesId: creditRequestFound.creditRequestId
    }
  }
}