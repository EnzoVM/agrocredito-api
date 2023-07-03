import FarmerAttributes from "./farmer.attributes.model"
import { FarmerList } from "./farmer.list.model"
import { Farmer } from "./farmer.model"

export default interface FarmerPersistanceRepository {
  createFarmer: (farmer: Farmer) => Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }>
  getFarmerAttributes: () => Promise<FarmerAttributes>
  getFarmerCount: () => Promise<number>
  getFarmersById: ({ farmerId }: { farmerId: string }) => Promise<{ farmers: FarmerList[], count: number }>
  getFarmersByFullNames: ({ fullNames }: { fullNames: string }) => Promise<{ farmers: FarmerList[], count: number }>
  getFarmersBySocialReason: ({ socialReason }: { socialReason: string }) => Promise<{ farmers: FarmerList[], count: number }>
}