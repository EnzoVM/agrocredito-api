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
      propertyProjectCode,
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
      !propertyProjectCode ||
      !propertySectorId
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    if (
      typeof farmerProjectId !== 'number' ||
      typeof farmerQualityId !== 'number' ||
      typeof propertyHectareQuantity !== 'number' ||
      typeof propertyLegalConditionId !== 'number' ||
      typeof propertyProjectCode !== 'number' ||
      typeof propertySectorId !== 'number'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    if (!Object.values(FarmerType).includes(farmerType)) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    if (farmerType === FarmerType.INDIVIDUAL) {
      if (
        !dni ||
        !fullNames
      ) {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
      }
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      if (
        !ruc ||
        !socialReason
      ) {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
      }
    }

    const projectsBySectorFound = await this.projectPersistanceRepository.getProjectsBySector({ sectorId: propertySectorId })

    const projectFound = projectsBySectorFound.find(project =>  project.projectSectorId === propertySectorId && project.projectCode === propertyProjectCode)

    if (!projectFound) {
      throw new NotFoundError({ message: 'El proyecto en la petición no existe en el sector especificado', core: 'farmer' })
    }
    
    const farmerCorrelative = await this.farmerPersistanceRepository.getLastFarmerCorrelative({ propertyProjectId: projectFound.projectId, propertySectorId: projectFound.projectSectorId }) + 1
    const farmerId = `${propertySectorId}.${propertyProjectCode}.${farmerCorrelative}`

    let farmerFound = await this.farmerPersistanceRepository.getFarmerById({ farmerId })

    if (farmerFound) {
      throw new ProcessError({ message: `El agricultor con ID ${farmerId} ya existe`, core: 'farmer' })
    }
    
    if (farmerType === FarmerType.INDIVIDUAL) {
      farmerFound = await this.farmerPersistanceRepository.getFarmerByDNI({ dni: dni! })
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      farmerFound = await this.farmerPersistanceRepository.getFarmerByRUC({ ruc: ruc! })
    }

    if (farmerFound) {
      throw new ProcessError({ message: `El agricultor con ${farmerFound.dni ? 'DNI' : 'RUC'} ${farmerFound.dni || farmerFound.ruc} ya existe`, core: 'farmer' })
    }

    const farmerCreated = await this.farmerPersistanceRepository.createFarmer({...farmer, correlative: farmerCorrelative, farmerId, propertyProjectId: projectFound.projectId})

    return `Agricultor ${farmerCreated.fullNames || farmerCreated.socialReason} con código ${farmerCreated.farmerId} creado exitósamente`
  }
}