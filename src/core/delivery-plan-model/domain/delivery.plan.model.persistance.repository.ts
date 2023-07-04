import DeliveryPlanModel from "./delivery.plan.model";

export default interface DeliveryPlanModelPersistanceRepository {
  
  createDeliveryPlanModel: (deliveryPlanModel: DeliveryPlanModel) => Promise<DeliveryPlanModel>
  getDeliveryPlanModelByCampaignId: (campaignId: string) => Promise<DeliveryPlanModel | null>
  deleteDeliveryPlanModel: (deliveryPlanModelId: number) => Promise<string>
  getLastDeliveryPlanModel: () => Promise<DeliveryPlanModel | null>

}