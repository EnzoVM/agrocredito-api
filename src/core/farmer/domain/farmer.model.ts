import { FarmerType } from "./farmer.type"

export interface Farmer {
  farmerId: string                     
  propertySectorId: number  
  propertyProjectCode: number
  propertyProjectId: number
  correlative: number
  farmerQualityId: number
  farmerType: FarmerType
  socialReason?: string
  fullNames?: string
  dni?: string
  ruc?: string
  propertyLocation: string
  propertyLegalConditionId: number
  cadastralRegistry: string
  farmerAddress: string
  farmerProjectId: number
  propertyHectareQuantity: number
}