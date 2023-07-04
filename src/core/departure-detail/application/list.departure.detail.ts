import DepartureDetail from "../domain/departure.detail.model";
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository";

export default class ListDepartureDetail {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
  ) {}

  async invoke ({
    deliveryPlanModelId
  }:{
    deliveryPlanModelId: number
  }): Promise<DepartureDetail[]> {
    
    const departureDetailList = await this.departureDetailPersistanceRepository.listDepartureDetail(deliveryPlanModelId)
    return departureDetailList
  }
}