import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

export default class UpdateFarmerUseCase {
  constructor (private readonly farmerPersistanceRepository: FarmerPersistanceRepository) {}
  
  async update ({ farmerId, farmerAddress, farmerProjectId, hectareQuantity }: { farmerId: string, farmerAddress?: string, farmerProjectId?: number, hectareQuantity?: number }): Promise<string> {
    const farmerFound = await this.farmerPersistanceRepository.getFarmerById({ farmerId })

    if (!farmerFound) {
      throw new NotFoundError({ message: 'The farmer specified is not found', core: 'farmer' })
    }

    const farmerUpdated = await this.farmerPersistanceRepository.updateFarmerById({ 
      farmerId, 
      farmerAddress: typeof farmerAddress !== 'undefined' ? farmerAddress : farmerFound.farmerAddress, 
      farmerProjectId: farmerProjectId, 
      hectareQuantity: typeof hectareQuantity !== 'undefined' ? hectareQuantity : farmerFound.propertyHectareQuantity
    })
    return `El agricultor ${farmerUpdated.fullNames || farmerUpdated.socialReason} con código ${farmerUpdated.farmerId} ha actualizado correctamente`
  }
}