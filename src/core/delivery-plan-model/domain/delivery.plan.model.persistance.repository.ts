import DeliveryPlanModel from "./delivery.plan.model"

export default interface DeliveryPlanModelPersistanceRepository {
  
  createDeliveryPlanModel: (deliveryPlanModel: DeliveryPlanModel) => Promise<DeliveryPlanModel>
  getDeliveryPlanModelByCampaignId: (campaignId: string) => Promise<DeliveryPlanModel | null>
  deleteDeliveryPlanModel: (deliveryPlanModelId: number) => Promise<string>
  getTotalNumberOfDeliveryPlanModel: () => Promise<number>
  getDeliveryPlanModelById: (deliveryPlanModelId: number) => Promise<DeliveryPlanModel | null>

}