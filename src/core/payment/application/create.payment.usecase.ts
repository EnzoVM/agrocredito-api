import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import PaymentCreateModel from "../domain/payment.create.model"
import PaymentPersistanceRepository from "../domain/payment.persistance.repository"
import PaymentResponseModel from "../domain/payment.response.model"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"

export default class CreatePaymentUseCase {
  
  constructor(
    private readonly paymentPersistanceRepository: PaymentPersistanceRepository,
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  ) {}

  async invoke ({
    creditRequestId,
    paymentDateTime,
    financialSourceId,
    currentAccountId,
    paymentDescription,
    paymentAmountPEN,
    exchangeRate
  }:{
    creditRequestId: string
    paymentDateTime: string
    financialSourceId: number
    currentAccountId: number
    paymentDescription: string
    paymentAmountPEN: number
    exchangeRate: number
  }): Promise<PaymentResponseModel>{

    if(
      !creditRequestId ||
      !paymentDateTime ||
      !financialSourceId ||
      !currentAccountId ||
      !paymentDescription ||
      !paymentAmountPEN ||
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
      typeof paymentAmountPEN !== 'number' ||
      typeof exchangeRate !== 'number' 
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Payment'})
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({creditRequestId})
    console.log(creditRequestFound)
    if(!creditRequestFound){
      throw new NotFoundError({ message: 'La solicitud de crédito especificado no existe', core: 'Payment'})
    }

    const campaignFound = await this.campaignPersistanceRepository.getCampaignById(creditRequestFound.campaignId)
    console.log(campaignFound)
    if(!campaignFound){
      throw new NotFoundError({ message: 'No se ha encontrado una campaña asociada', core: 'Payment'})
    }
    
    let suma: number = 0
    const paymentFound = await this.paymentPersistanceRepository.listPaymentsByCreditRequestId({creditRequestId})
    console.log(paymentFound)
    for(const payment of paymentFound) { suma += payment.paymentAmount}

    const paymentAmountUSD: number = paymentAmountPEN/exchangeRate
    const fullPayment: number = creditRequestFound.creditAmount+(campaignFound.campaignInterest*creditRequestFound.creditAmount)+(campaignFound.campaignDelinquentInterest*creditRequestFound.creditAmount)

    if(suma+paymentAmountUSD > fullPayment){
      throw new ProcessError({ message: 'El monto ingresado superar el monto del crédito elegido', core: 'Payment'})
    }
    
    const newPayment: PaymentCreateModel = {
      creditRequestId,
      paymentDateTime: new Date(paymentDateTime),
      financialSourceId,
      currentAccountId,
      paymentDescription,
      paymentAmountUSD,
      paymentAmountPEN, 
    }

    const paymentAdded = await this.paymentPersistanceRepository.createPayment({payment: newPayment})
    console.log(paymentAdded)
    return paymentAdded
  }
}