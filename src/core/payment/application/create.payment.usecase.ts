import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import PaymentCreateModel from "../domain/payment.create.model"
import PaymentPersistanceRepository from "../domain/payment.persistance.repository"
import PaymentResponseModel from "../domain/payment.response.model"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"
import { interesGeneral, interesMoratorio } from "../../../utils/interest"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import { CreditRequestStatusType } from "../../credit-request/domain/credit.request.status.type"

export default class CreatePaymentUseCase {
  
  constructor(
    private readonly paymentPersistanceRepository: PaymentPersistanceRepository,
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository
  ) {}

  async invoke ({
    creditRequestId,
    paymentDateTime,
    financialSourceId,
    currentAccountId,
    paymentDescription,
    paymentAmountUSD,
    exchangeRate
  }:{
    creditRequestId: string
    paymentDateTime: string
    financialSourceId: number
    currentAccountId: number
    paymentDescription: string
    paymentAmountUSD: number
    exchangeRate: number
  }): Promise<PaymentResponseModel>{

    if(
      !creditRequestId ||
      !paymentDateTime ||
      !financialSourceId ||
      !currentAccountId ||
      !paymentDescription ||
      !paymentAmountUSD ||
      !exchangeRate
    ){
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Payment'})
    }

    if(
      typeof creditRequestId !== 'string' ||
      typeof paymentDateTime !== 'string' ||
      typeof financialSourceId !== 'number' ||
      typeof currentAccountId !== 'number' ||
      typeof paymentDescription !== 'string' ||
      typeof paymentAmountUSD !== 'number' ||
      typeof exchangeRate !== 'number' 
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Payment'})
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({creditRequestId})
    if(!creditRequestFound) throw new NotFoundError({ message: 'La solicitud de crédito especificado no existe', core: 'Payment'})

    const deliveriesFound = await this.deliveryPersistanceRepository.listDeliveriesByCreditRequestId({creditRequestId})
    if(deliveriesFound.length === 0) throw new NotFoundError({ message: 'No existe entregas asociadas a este pago', core: 'Payment'})

    const campaignFound = await this.campaignPersistanceRepository.getCampaignById(creditRequestFound.campaignId)
    if(!campaignFound) throw new NotFoundError({ message: 'No se ha encontrado una campaña asociada', core: 'Payment'})
    
    let paymentSum: number = 0
    const paymentFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({creditRequestId})
    for(const payment of paymentFound) paymentSum += payment.paymentAmount
    
    const amountDelivered = deliveriesFound.reduce((accum, delivery) => accum + delivery.deliveryAmount, 0)
    
    const generalInterest = deliveriesFound
      .map(delivery => {
        return interesGeneral({
          camaignYear: campaignFound.campaignYear,
          finishDate: campaignFound.finishDate,
          fechaEntrega: delivery.deliveryDateTime,
          capital: delivery.deliveryAmount,
          fechaReporte: new Date(),
          porcentaje: campaignFound.campaignInterest
        })
      })
      .reduce((accum, interest) => accum + interest, 0)

    const residualInterest = generalInterest - paymentSum

    const lateInterest = interesMoratorio({
      camaignYear: campaignFound.campaignYear,
      finishDate: campaignFound.finishDate,
      fechaReporte: new Date(),
      porcentaje: campaignFound.campaignDelinquentInterest,
      capital: amountDelivered + (residualInterest > 0 ? 0 : residualInterest)
    })

    const fullPayment = creditRequestFound.creditAmount + generalInterest + lateInterest
    if(paymentSum+paymentAmountUSD > fullPayment) throw new ProcessError({ message: 'El monto ingresado superar el monto del crédito elegido', core: 'Payment'})

    if(paymentSum+paymentAmountUSD === fullPayment){
      await this.creditRequestPersistanceRepository.updateCreditRequestStatusById({
        creditRequestStatus: CreditRequestStatusType.PAID,
        creditRequestId: creditRequestFound.creditRequestId,
        updateStatusDateTime: new Date()
      })
    }
    
    const newPayment: PaymentCreateModel = {
      creditRequestId,
      paymentDateTime: new Date(paymentDateTime),
      financialSourceId,
      currentAccountId,
      paymentDescription,
      paymentAmountUSD,
      paymentAmountPEN: paymentAmountUSD*exchangeRate,
    }

    const paymentAdded = await this.paymentPersistanceRepository.createPayment({payment: newPayment})
    return paymentAdded
  }
}