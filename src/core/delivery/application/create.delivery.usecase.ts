import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error";
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error";
import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository";
import DeliveryCreateModel from "../domain/delivery.create.model";
import DeliveryPersistanceRepository from "../domain/delivery.persistance.respository";
import DeliveryResponseModel from "../domain/delivery.response.model";

export default class CreateDeliveryUseCase {
  
  constructor(
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository,
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository
  ) {}

  async invoke ({
    creditRequestId,
    deliveryDatetime,
    providerId,
    financialSourceId,
    currentAccountId,
    gloss
  }:{
    creditRequestId: string,
    deliveryDatetime: string
    providerId: number
    financialSourceId: number
    currentAccountId: number
    gloss: string
  }
  ): Promise <DeliveryResponseModel> {

    if(
      !creditRequestId ||
      !deliveryDatetime ||
      !providerId ||
      !financialSourceId ||
      !currentAccountId ||
      !gloss
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery'})
    }

    if(
      typeof creditRequestId !== 'string' ||
      typeof deliveryDatetime !== 'string' ||
      typeof providerId !== 'number' ||
      typeof financialSourceId !== 'number' ||
      typeof currentAccountId !== 'number' ||
      typeof gloss !== 'string'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery'})
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({creditRequestId})
    if(!creditRequestFound){
      throw new NotFoundError({ message: 'La solicitud de crédito especificado no existe', core: 'Delivery'})
    }

    let deliveryAmount: number = 0
    const deliveriesFound = await this.deliveryPersistanceRepository.getDeliveriesByCreditRequestId({creditRequestId})
    if(deliveriesFound === 0){
      deliveryAmount = 0.80*creditRequestFound.creditAmount
    }
    if(deliveriesFound === 1){
      deliveryAmount = 0.20*creditRequestFound.creditAmount
    }
    if(deliveriesFound >= 2){
      throw new ProcessError({ message: 'No se puede realizar más entregas, porque ya se han hecho 2', core: 'Delivery'})
    }
    
    const newDelivery: DeliveryCreateModel = {
      creditRequestId,
      deliveryDatetime: new Date(deliveryDatetime),
      providerId,
      financialSourceId,
      currentAccountId,
      gloss,
      deliveryAmount
    }

    const deliveryAdded = await this.deliveryPersistanceRepository.createDelivery({delivery: newDelivery})

    return deliveryAdded
  }
}