import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import AccountStatusModel, { Payment } from "../domain/account.status.model"

export default class GetAccountStatusUseCase {
  constructor (
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository
  ) {}

  async get ({ creditRequestId }: { creditRequestId: string }): Promise<AccountStatusModel> {
    if (typeof creditRequestId === 'undefined') {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'account-status' })
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({ creditRequestId })

    if (!creditRequestFound) {
      throw new NotFoundError({ message: 'La solicitud de crédito especificada no existe', core: 'account-status' })
    }

    const deliveriesFound = await this.deliveryPersistanceRepository.listDeliveriesByCreditRequestId({ creditRequestId })

    const payments: Payment[] = [
      {
        paymentAmount: 0,
        transactionDateTime: new Date()
      }
    ]

    const interest = 0
    const totalPayment = payments.reduce((accum, payment) => accum + payment.paymentAmount, 0)
    const amountDelivered = deliveriesFound.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
    const amountDeliveredPercentage = (Math.round(((amountDelivered / creditRequestFound.creditAmount) + Number.EPSILON) * 100) / 100) * 100
    const finalDebt = creditRequestFound.creditAmount - (interest + totalPayment)
    
    return {
      amountDelivered,
      amountDeliveredPercentage,
      finalDebt,
      payments,
      interest,
      totalPayment,
      creditAmount: creditRequestFound.creditAmount
    }
  }
}