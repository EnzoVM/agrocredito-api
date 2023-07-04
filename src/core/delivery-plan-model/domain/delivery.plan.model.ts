
export default class DeliveryPlanModel {
  deliveryPlanModelId: number
  campaignId: string
  deliveryPlanModelDescription: string

  constructor({
    deliveryPlanModelId, 
    campaignId, 
    deliveryPlanModelDescription
  }:{
    deliveryPlanModelId: number, 
    campaignId: string, 
    deliveryPlanModelDescription: string
  }) {
    this.deliveryPlanModelId = deliveryPlanModelId
    this.campaignId = campaignId
    this.deliveryPlanModelDescription = deliveryPlanModelDescription    
  }
}