import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"
import DeliveryPlanModelPersistanceRepository from "../../delivery-plan-model/domain/delivery.plan.model.persistance.repository"
import DepartureDetailList from "../domain/departure.detail.list.model"
import DepartureDetailCreate from "../domain/departure.detail.create.model"

export default class CreateDepartureDetailUseCase {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository,
    private readonly deliveryPlanModelPersistanceRepository: DeliveryPlanModelPersistanceRepository
  ) {}

  async invoke ({
    deliveryPlanModelId,
    departureDetailDescription,
    departureType,
    amountPerHectare,
  }:{
    deliveryPlanModelId: number,
    departureDetailDescription: string,
    departureType: string,
    amountPerHectare: number
  }): Promise<DepartureDetailList> {
    
    if(
      !deliveryPlanModelId ||
      !departureDetailDescription ||
      !departureType ||
      !amountPerHectare
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery Plan Model'})
    }

    if(
      typeof deliveryPlanModelId !== 'number' || 
      typeof departureDetailDescription !== 'string' ||
      typeof departureType !== 'string' ||
      typeof amountPerHectare !== 'number'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery Plan Model'})
    }
    
    const deliveryPlanModelFound = await this.deliveryPlanModelPersistanceRepository.getDeliveryPlanModelById({deliveryPlanModelId})
    if(!deliveryPlanModelFound){
      throw new BadRequestError({ message: 'There is no delivery plan model', core: 'Delivery Plan Model'})
    }

    const departureDetailsFound = await this.departureDetailPersistanceRepository.listDepartureDetail({deliveryPlanModelId})
    if(departureDetailsFound.length >= 2){
      throw new ProcessError({ message: 'Only 2 line item details can be created per delivery plan model', core: 'Departure Detail'})
    }
    
    const newDepartureDetail: DepartureDetailCreate = {
      deliveryPlanModelId,
      departureDetailDescription,
      departureType,
      resource: 'Efectivo',
      amountPerHectare,
    }

    const departureDetailCreated = await this.departureDetailPersistanceRepository.createDepartureDetail({departureDetail: newDepartureDetail})

    return departureDetailCreated
  }
}