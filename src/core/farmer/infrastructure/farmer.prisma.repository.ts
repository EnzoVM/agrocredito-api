import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import FarmerAttributes from "../domain/farmer.attributes.model"
import { Farmer } from "../domain/farmer.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

const prisma = new PrismaConnection().connection

export default class FarmerPrismaRepository implements FarmerPersistanceRepository {
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
}