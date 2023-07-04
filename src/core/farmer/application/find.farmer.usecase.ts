import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import { FarmerDetail } from "../domain/farmer.detail.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

export default class FindFarmerUseCase {
  constructor (private readonly farmerPersistanceRepository: FarmerPersistanceRepository) {}
  
  async get ({ farmerId }: { farmerId: string }): Promise<FarmerDetail> {
    const farmerFound = await this.farmerPersistanceRepository.getFarmerById({ farmerId })

    if (!farmerFound) {
      throw new NotFoundError({ message: 'The farmer specified is not found', core: 'farmer' })
    }

    return farmerFound
  }
}