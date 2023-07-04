import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import DepartureDetail from "../domain/departure.detail.model";
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository";

export default class CreateDepartureDetail {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
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
  }): Promise<DepartureDetail> {
    
    let departureDetailId: number = 0

    const departureDetailsFound = await this.departureDetailPersistanceRepository.listDepartureDetail(deliveryPlanModelId)

    if(departureDetailsFound.length >= 2){
      throw new ProcessError({ message: 'Only 2 line item details can be created per delivery plan model', core: 'Departure Detail'})
    }

    const lastDepartureDetail = await this.departureDetailPersistanceRepository.getLastDepartureDetail()
    
    if(!lastDepartureDetail){
      departureDetailId = 1
    }else {
      departureDetailId = lastDepartureDetail.departureDetailId + 1
    }

    const newDepartureDetail = new DepartureDetail({
      departureDetailId,
      deliveryPlanModelId,
      departureDetailDescription,
      departureType,
      resource: 'Efectivo',
      amountPerHectare,
    })

    const departureDetailCreated = await this.departureDetailPersistanceRepository.createDepartureDetail(newDepartureDetail)

    return departureDetailCreated
  }
}