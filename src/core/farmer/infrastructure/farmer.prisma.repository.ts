import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import FarmerAttributes from "../domain/farmer.attributes.model"
import { FarmerDetail } from "../domain/farmer.detail.model"
import { FarmerList } from "../domain/farmer.list.model"
import { Farmer } from "../domain/farmer.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

const prisma = new PrismaConnection().connection

export default class FarmerPrismaRepository implements FarmerPersistanceRepository {
  async getFarmersById ({ farmerId }: { farmerId: string }): Promise<{ farmers: FarmerList[], count: number }> {
    try {
      const farmersFound = await prisma.farmer.findMany({
        where: {
          farmer_id: {
            startsWith: farmerId
          }
        },
        include: {
          farmer_quality: true
        }
      })

      const count = farmersFound.length
  
      return {
        farmers: farmersFound.map(farmer => {
          return {
            farmerId: farmer.farmer_id,
            farmerQualityDescription: farmer.farmer_quality.farmer_quality_description,
            farmerType: farmer.farmer_type,
            socialReason: farmer.social_reason ? farmer.social_reason : undefined,
            fullNames: farmer.full_names ? farmer.full_names : undefined,
            dni: farmer.dni ? farmer.dni : undefined,
            ruc: farmer.ruc ? farmer.ruc : undefined
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async getFarmersByFullNames ({ fullNames }: { fullNames: string }): Promise<{ farmers: FarmerList[], count: number }> {
    try {
      const farmersFound = await prisma.farmer.findMany({
        where: {
          full_names: {
            startsWith: fullNames
          }
        },
        include: {
          farmer_quality: true
        }
      })

      const count = farmersFound.length
  
      return {
        farmers: farmersFound.map(farmer => {
          return {
            farmerId: farmer.farmer_id,
            farmerQualityDescription: farmer.farmer_quality.farmer_quality_description,
            farmerType: farmer.farmer_type,
            socialReason: farmer.social_reason ? farmer.social_reason : undefined,
            fullNames: farmer.full_names ? farmer.full_names : undefined,
            dni: farmer.dni ? farmer.dni : undefined,
            ruc: farmer.ruc ? farmer.ruc : undefined
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async getFarmersBySocialReason ({ socialReason }: { socialReason: string }): Promise<{ farmers: FarmerList[], count: number }> {
    try {
      const farmersFound = await prisma.farmer.findMany({
        where: {
          social_reason: {
            startsWith: socialReason
          }
        },
        include: {
          farmer_quality: true
        }
      })

      const count = farmersFound.length
  
      return {
        farmers: farmersFound.map(farmer => {
          return {
            farmerId: farmer.farmer_id,
            farmerQualityDescription: farmer.farmer_quality.farmer_quality_description,
            farmerType: farmer.farmer_type,
            socialReason: farmer.social_reason ? farmer.social_reason : undefined,
            fullNames: farmer.full_names ? farmer.full_names : undefined,
            dni: farmer.dni ? farmer.dni : undefined,
            ruc: farmer.ruc ? farmer.ruc : undefined
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async createFarmer (farmer: Farmer): Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }> {
    try {
      const farmerSaved = await prisma.farmer.create({
        data: {
          farmer_id: farmer.farmerId,
          property_sector_id: farmer.propertySectorId,
          property_project_id: farmer.propertyProjectId,
          correlative: farmer.correlative,
          farmer_quality_id: farmer.farmerQualityId,
          farmer_type: farmer.farmerType,
          social_reason: farmer.socialReason,
          full_names: farmer.fullNames,
          dni: farmer.dni,
          ruc: farmer.ruc,
          property_location: farmer.propertyLocation,
          property_legal_condition_id: farmer.propertyLegalConditionId,
          cadastral_registry: farmer.cadastralRegistry,
          farmer_address: farmer.farmerAddress,
          farmer_project_id: farmer.farmerProjectId,
          property_hectare_quantity: farmer.propertyHectareQuantity
        }
      })
  
      
      return {
        farmerId: farmerSaved.farmer_id,
        socialReason: farmerSaved.social_reason,
        fullNames: farmerSaved.full_names
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async getFarmerAttributes (): Promise<FarmerAttributes> {
    try {
      const farmerAttributesFound = await Promise.all([await prisma.farmer_quality.findMany(), await prisma.property_legal_condition.findMany()])

      return {
        farmerQualities: farmerAttributesFound[0].map(farmerQuality => {
          return {
            farmerQualityId: farmerQuality.farmer_quality_id,
            farmerQualityDescription: farmerQuality.farmer_quality_description
          }
        }),
        propertyLegalConditions: farmerAttributesFound[1].map(propertyLegalCondition => {
          return {
            propertyLegalConditionId: propertyLegalCondition.property_legal_condition_id,
            propertyLegalConditionDescription: propertyLegalCondition.property_legal_condition_description
          }
        })
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async getFarmerCount (): Promise<number> {
    try {
      const farmerCount = await prisma.farmer.count()
      return farmerCount
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async updateFarmerById ({ farmerId, hectareQuantity, farmerAddress, farmerProjectId }: { farmerId: string, hectareQuantity?: number, farmerAddress?: string,farmerProjectId?: number }): Promise<FarmerDetail> {
    try {
      const farmerUpdate = await prisma.farmer.update({
        where: {
          farmer_id: farmerId
        },
        include: {
          farmer_project: {
            include: {
              sector: true
            }
          },
          property_project: true,
          farmer_quality: true,
          property_legal_condition: true
        },
        data: {
          property_hectare_quantity: hectareQuantity,
          farmer_address: farmerAddress,
          farmer_project_id: farmerProjectId
        }
      })

      return  {
        farmerId: farmerUpdate.farmer_id,                   
        propertySector: farmerUpdate.farmer_project.sector.sector_description,
        propertyProject: farmerUpdate.property_project.project_description,
        correlative: farmerUpdate.correlative,
        farmerQuality: farmerUpdate.farmer_quality.farmer_quality_description,
        farmerType: farmerUpdate.farmer_type,
        socialReason: farmerUpdate.social_reason ? farmerUpdate.social_reason : undefined,
        fullNames: farmerUpdate.full_names ? farmerUpdate.full_names : undefined,
        dni: farmerUpdate.dni ? farmerUpdate.dni : undefined,
        ruc: farmerUpdate.ruc ? farmerUpdate.ruc : undefined,
        propertyLocation: farmerUpdate.property_location,
        propertyLegalCondition: farmerUpdate.property_legal_condition.property_legal_condition_description,
        cadastralRegistry: farmerUpdate.cadastral_registry,
        farmerAddress: farmerUpdate.farmer_address,
        farmerProject: farmerUpdate.farmer_project.project_description,
        propertyHectareQuantity: farmerUpdate.property_hectare_quantity
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }

  async getFarmerById ({ farmerId }: { farmerId: string }): Promise<FarmerDetail | null> {
    try {
      const farmerFound = await prisma.farmer.findUnique({
        where: {
          farmer_id: farmerId
        },
        include: {
          farmer_project: {
            include: {
              sector: true
            }
          },
          property_project: true,
          farmer_quality: true,
          property_legal_condition: true
        }
      })

      if (!farmerFound) {
        return null
      }

      return {
        farmerId: farmerFound.farmer_id,                   
        propertySector: farmerFound.farmer_project.sector.sector_description,
        propertyProject: farmerFound.property_project.project_description,
        correlative: farmerFound.correlative,
        farmerQuality: farmerFound.farmer_quality.farmer_quality_description,
        farmerType: farmerFound.farmer_type,
        socialReason: farmerFound.social_reason ? farmerFound.social_reason : undefined,
        fullNames: farmerFound.full_names ? farmerFound.full_names : undefined,
        dni: farmerFound.dni ? farmerFound.dni : undefined,
        ruc: farmerFound.ruc ? farmerFound.ruc : undefined,
        propertyLocation: farmerFound.property_location,
        propertyLegalCondition: farmerFound.property_legal_condition.property_legal_condition_description,
        cadastralRegistry: farmerFound.cadastral_registry,
        farmerAddress: farmerFound.farmer_address,
        farmerProject: farmerFound.farmer_project.project_description,
        propertyHectareQuantity: farmerFound.property_hectare_quantity
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }
}