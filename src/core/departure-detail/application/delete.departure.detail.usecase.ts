import DepartureDetailList from "../domain/departure.detail.list.model"
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"

export default class DeleteDepartureDetailUseCase {
  
  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
  ) {}

  async invoke ({
    departureDetailId
  }:{
    departureDetailId: number
  }): Promise<DepartureDetailList> {
    
    const departureDetailMessageDeleted = await this.departureDetailPersistanceRepository.deleteDepartureDetail({departureDetailId})
    return departureDetailMessageDeleted
  }
}