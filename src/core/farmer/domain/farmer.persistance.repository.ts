import { FarmerCreate } from "./farmer.create.model"
import { Farmer } from "./farmer.model"

export default interface FarmerPersistanceRepository {
  createFarmer: (farmer: FarmerCreate) => Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }>
}