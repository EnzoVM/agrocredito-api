import PrismaConnection from "../../../prisma/prisma.connection"
import { FarmerCreate } from "../domain/farmer.create.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"

const prisma = new PrismaConnection().connection

export default class FarmerPrismaRepository implements FarmerPersistanceRepository {
  async createFarmer (farmer: FarmerCreate): Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }> {
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
  }
}