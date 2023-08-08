import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import { CreditRequestStatusType } from "../../credit-request/domain/credit.request.status.type"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import AccountStatusModel, { Payment } from "../domain/account.status.model"

export default class GetAccountStatusUseCase {
  constructor (
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  ) {}

  async get ({ creditRequestId }: { creditRequestId: string }): Promise<AccountStatusModel> {
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

    const payments: Payment[] = [
      {
        paymentAmount: 0,
        transactionDateTime: new Date()
      }
    ]

    const interest = (campaignFound.campaignInterest / 100) * creditRequestFound.creditAmount
    const delinquentInterest = (campaignFound.campaignDelinquentInterest / 100) * creditRequestFound.creditAmount
    const totalPayment = payments.reduce((accum, payment) => accum + payment.paymentAmount, 0)
    const amountDelivered = deliveriesFound.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
    const amountDeliveredPercentage = (Math.round(((amountDelivered / creditRequestFound.creditAmount) + Number.EPSILON) * 100) / 100) * 100
    const finalDebt = (creditRequestFound.creditAmount + interest + delinquentInterest) - totalPayment
    
    return {
      campaignFinishDate: `${campaignFound.finishDate}/${campaignFound.campaignYear}`,
      amountDelivered,
      amountDeliveredPercentage,
      finalDebt,
      payments,
      deliveries: deliveriesFound.map(delivery => {
        return {
          deliveryAmount: delivery.deliveryAmount,
          deliveryDateTime: delivery.deliveryDateTime
        }
      }),
      interest,
      interesPercentage: campaignFound.campaignInterest,
      delinquentInterest,
      delinquentInterestPercentage: campaignFound.campaignDelinquentInterest,
      totalPayment,
      creditAmount: creditRequestFound.creditAmount
    }
  }
}