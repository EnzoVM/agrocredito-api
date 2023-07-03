import { FarmerType } from "./farmer.type"

export interface FarmerList {
  farmerId: string
  farmerQualityDescription: string
  farmerType: string
  socialReason?: string
  fullNames?: string
  dni?: string
  ruc?: string
}