import { FarmerType } from "./farmer.type"

export interface FarmerCreate {
  propertySectorId: number   
  propertyProjectCode: number
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