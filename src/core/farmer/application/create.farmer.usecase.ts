import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import ProjectPersistanceRepository from "../../project/domain/project.persistance.repository"
import { FarmerCreate } from "../domain/farmer.create.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"
import { FarmerType } from "../domain/farmer.type"

export default class CreateFarmerUseCase {
  constructor (
    private readonly farmerPersistanceRepository: FarmerPersistanceRepository,
    private readonly projectPersistanceRepository: ProjectPersistanceRepository
  ) {}

  async create(farmer: FarmerCreate): Promise<string> {
    const {
      cadastralRegistry,
      farmerAddress,
      farmerProjectId,
      farmerQualityId,
      farmerType,
      propertyHectareQuantity,
      propertyLegalConditionId,
      propertyLocation,
      propertyProjectId,
      propertySectorId,
      dni,
      fullNames,
      ruc,
      socialReason
    } = farmer
    
    if (
      !cadastralRegistry ||
      !farmerAddress ||
      !farmerProjectId ||
      !farmerQualityId ||
      !farmerType ||
      !propertyHectareQuantity ||
      !propertyLegalConditionId ||
      !propertyLocation ||
      !propertyProjectId ||
      !propertySectorId
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    if (
      typeof farmerProjectId !== 'number' ||
      typeof farmerQualityId !== 'number' ||
      typeof propertyHectareQuantity !== 'number' ||
      typeof propertyLegalConditionId !== 'number' ||
      typeof propertyProjectId !== 'number' ||
      typeof propertySectorId !== 'number'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    if (farmerType in FarmerType) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    if (farmerType === 'Individual') {
      if (
        !dni ||
        !fullNames
      ) {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
      }
    }

    if (farmerType === 'Asociación') {
      if (
        !ruc ||
        !socialReason
      ) {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
      }
    }

    const projectsBySectorFound = await this.projectPersistanceRepository.getProjectsBySector({ sectorId: propertySectorId })

    const projectFound = projectsBySectorFound.find(project => project.projectId === propertyProjectId)

    if (!projectFound) {
      throw new NotFoundError({ message: 'El proyecto en la petición no existe en el sector especificado', core: 'farmer' })
    }
    
    const farmerCorrelative = await this.farmerPersistanceRepository.getFarmerCount() + 1
    const farmerId = `${propertySectorId}.${propertyProjectId}.${farmerCorrelative}`

    let farmerFound = await this.farmerPersistanceRepository.getFarmerById({ farmerId })

    if (farmerFound) {
      throw new ProcessError({ message: `El agricultor con ID ${farmerId} ya existe`, core: 'farmer' })
    }
    
    if (farmerType === 'Individual') {
      farmerFound = await this.farmerPersistanceRepository.getFarmerByDNI({ dni: dni! })
    }

    if (farmerType === 'Asociación') {
      farmerFound = await this.farmerPersistanceRepository.getFarmerByRUC({ ruc: ruc! })
    }

    if (farmerFound) {
      throw new ProcessError({ message: `El agricultor con ${farmerFound.dni ? 'DNI' : 'RUC'} ${farmerFound.dni || farmerFound.ruc} ya existe`, core: 'farmer' })
    }


    const farmerCreated = await this.farmerPersistanceRepository.createFarmer({...farmer, correlative: farmerCorrelative, farmerId})

    return `Agricultor ${farmerCreated.fullNames || farmerCreated.socialReason} con código ${farmerCreated.farmerId} creado exitósamente`
  }
}