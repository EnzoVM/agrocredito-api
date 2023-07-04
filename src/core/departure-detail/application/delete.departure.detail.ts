import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository";

export default class DeleteDepartureDetail {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository
  ) {}

  async invoke ({
    departureDetailId
  }:{
    departureDetailId: number
  }): Promise<string> {
    
    const departureDetailDeleted = await this.departureDetailPersistanceRepository.deleteDepartureDetail(departureDetailId)
    return departureDetailDeleted
  }
}