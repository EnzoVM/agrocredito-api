import DepartureDetailCreate from "./departure.detail.create.model"
import DepartureDetailList from "./departure.detail.list.model"

export default interface DepartureDetailPersistanceRepository {

  createDepartureDetail: ({departureDetail}:{departureDetail: DepartureDetailCreate}) => Promise<DepartureDetailList>
  listDepartureDetail: ({deliveryPlanModelId}:{deliveryPlanModelId: number}) => Promise<DepartureDetailList[]>
  deleteDepartureDetail: ({departureDetailId}:{departureDetailId: number}) => Promise<DepartureDetailList>
  getDepartureDetailByCampaignId: ({campaignId}:{campaignId: string}) => Promise<DepartureDetailList[] | null>

}