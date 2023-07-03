import FarmerAttributes from "../domain/farmer.attributes.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

export default class ListFarmerAttributesUseCase {
  constructor (private readonly farmerPersistanceRepository: FarmerPersistanceRepository) {}
  
  async list(): Promise<FarmerAttributes> {
    const farmerAttributesFound = await this.farmerPersistanceRepository.getFarmerAttributes()
    return farmerAttributesFound
  }
}