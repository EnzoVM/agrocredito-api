import FarmerAttributes from "./farmer.attributes.model"
import { FarmerDetail } from "./farmer.detail.model"
import { FarmerList } from "./farmer.list.model"
import { Farmer } from "./farmer.model"
import { FarmerType } from "./farmer.type"

export default interface FarmerPersistanceRepository {
  createFarmer: (farmer: Farmer) => Promise<{ farmerId: string, fullNames: string | null,  socialReason: string | null }>
  getFarmerAttributes: () => Promise<FarmerAttributes>
  getLastFarmerCorrelative: ({ propertySectorId, propertyProjectId } : { propertySectorId: number, propertyProjectId: number }) => Promise<number>
  getFarmersByIncludeId: ({ farmerId, farmerType }: { farmerId: string, farmerType: FarmerType }) => Promise<{ farmers: FarmerList[], count: number }>
  getFarmersByFullNames: ({ fullNames }: { fullNames: string }) => Promise<{ farmers: FarmerList[], count: number }>
  getFarmersBySocialReason: ({ socialReason }: { socialReason: string }) => Promise<{ farmers: FarmerList[], count: number }>
  updateFarmerById: ({ farmerId, hectareQuantity, farmerAddress, farmerProjectId }: { farmerId: string, hectareQuantity: number, farmerAddress: string,farmerProjectId?: number }) => Promise<FarmerDetail>
  getFarmerById: ({ farmerId }: { farmerId: string }) => Promise<FarmerDetail | null>
  getFarmerByDNI: ({ dni }: { dni: string }) => Promise<FarmerDetail | null>
  getFarmerByRUC: ({ ruc }: { ruc: string }) => Promise<FarmerDetail | null>
  deleteFarmerById: ({ farmerId }: { farmerId: string }) => Promise<string>
  countFarmerMatchToProject: ({projectSectorId, projectCode}:{projectSectorId: number, projectCode: number}) => Promise<number>
}