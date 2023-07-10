import DepartureDetail from "../domain/departure.detail.model"
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"

export default class DeleteDepartureDetailUseCase {
  
  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
  ) {}

  async invoke ({
    departureDetailId
  }:{
    departureDetailId: number
  }): Promise<DepartureDetail> {
    
    const departureDetailMessageDeleted = await this.departureDetailPersistanceRepository.deleteDepartureDetail(departureDetailId)
    return departureDetailMessageDeleted
  }
}