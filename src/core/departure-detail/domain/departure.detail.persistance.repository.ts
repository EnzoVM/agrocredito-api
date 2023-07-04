import DepartureDetail from "./departure.detail.model"

export default interface DepartureDetailPersistanceRepository {

  createDepartureDetail: (departureDetail: DepartureDetail) => Promise<DepartureDetail>
  listDepartureDetail: (deliveryPlanModelId: number) => Promise<DepartureDetail[]>
  deleteDepartureDetail: (departureDetailId: number) => Promise<string>
  getTotalNumberOfDepartureDetail: () => Promise<number>
  
}