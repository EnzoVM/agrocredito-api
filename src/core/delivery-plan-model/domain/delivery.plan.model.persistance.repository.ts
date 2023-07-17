import DeliveryPlanModelCreate from "./delivery.plan.model.create.mode"
import DeliveryPlanModelList from "./delivery.plan.model.list.model"

export default interface DeliveryPlanModelPersistanceRepository {
  
  createDeliveryPlanModel: ({deliveryPlanModel}:{deliveryPlanModel: DeliveryPlanModelCreate}) => Promise<DeliveryPlanModelList>
  getDeliveryPlanModelByCampaignId: ({campaignId}:{campaignId: string}) => Promise<DeliveryPlanModelList | null>
  deleteDeliveryPlanModel: ({deliveryPlanModelId}:{deliveryPlanModelId: number}) => Promise<string>
  getDeliveryPlanModelById: ({deliveryPlanModelId}:{deliveryPlanModelId: number}) => Promise<DeliveryPlanModelList | null>

}