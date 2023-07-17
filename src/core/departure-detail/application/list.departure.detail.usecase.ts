import DepartureDetailList from "../domain/departure.detail.list.model"
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"

export default class ListDepartureDetailUseCase {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
  ) {}

  async invoke ({
    deliveryPlanModelId
  }:{
    deliveryPlanModelId: number
  }): Promise<DepartureDetailList[]> {
    
    const departureDetailList = await this.departureDetailPersistanceRepository.listDepartureDetail({deliveryPlanModelId})
    return departureDetailList
  }
}