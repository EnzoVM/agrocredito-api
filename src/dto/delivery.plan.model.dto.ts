import { IsNotEmpty, IsString } from "class-validator"

export default class DeliveryPlanModelDTO {

    @IsNotEmpty({ message: 'Campaign ID is empty'})
    @IsString({ message: 'Campaign ID must be a string'})
      campaignId: string

    @IsNotEmpty({ message: 'Description of delivery plan model is empty'})
    @IsString({ message: 'Description of delivery plan model must be a number'})
      deliveryPlanModelDescription: string

    constructor({ 
      campaignId, 
      deliveryPlanModelDescription
    }:{
      campaignId: string, 
      deliveryPlanModelDescription: string
    }) {
      this.campaignId = campaignId
      this.deliveryPlanModelDescription = deliveryPlanModelDescription
    }
}