import FarmerAttributes from "./farmer.attributes.model"
import { Farmer } from "./farmer.model"

export default interface FarmerPersistanceRepository {
  createFarmer: (farmer: Farmer) => Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }>
  getFarmerAttributes: () => Promise<FarmerAttributes>
  getFarmerCount: () => Promise<number>
}