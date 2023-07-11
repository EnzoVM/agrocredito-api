import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"

export default class DeleteFarmerUseCase {
  constructor (
    private readonly farmerPersistanceRepository: FarmerPersistanceRepository,
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository
  ) {}
  
  async delete ({ farmerId }: { farmerId: string }): Promise<string> {
    const farmerFound = await this.farmerPersistanceRepository.getFarmerById({ farmerId })

    if (!farmerFound) {
      throw new ProcessError({ message: `El agricultor con código ${farmerId} no existe`, core: 'farmer' })
    }

    const creditRequestNumber = await this.creditRequestPersistanceRepository.getNumberOfCreditRequestByFarmer({ farmerId })

    if (creditRequestNumber > 0) {
      throw new ProcessError({ message: 'No se pudo elminar al agricultor porque posee solicitudes de crédito', core: 'farmer' })
    }

    const farmerDeleted = await this.farmerPersistanceRepository.deleteFarmerById({ farmerId })

    return `El agricultor con código ${farmerDeleted} ha sido eliminado con éxito`
  }
}