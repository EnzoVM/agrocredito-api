import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import DeliveryPlanModel from "../domain/delivery.plan.model";
import DeliveryPlanModelPersistanceRepository from "../domain/delivery.plan.model.persistance.repository";

export default class CreateDeliveryPlanModel {
  constructor(
    private readonly deliveryPlanModelPersistanceRepository: DeliveryPlanModelPersistanceRepository
  ) {}

  async invoke ({
    campaignId, 
    deliveryPlanModelDescription
  }:{
    campaignId: string, 
    deliveryPlanModelDescription: string
  }): Promise<DeliveryPlanModel> {
    
    let deliveryPlanModelId: number = 0
    
    const deliveryPlanModelFound = await this.deliveryPlanModelPersistanceRepository.getDeliveryPlanModelByCampaignId(campaignId)
    if(deliveryPlanModelFound) {
      throw new ProcessError({ message: 'You can only create 1 delivery plan template per campaign', core: 'Delivery Plan Model'})
    }

    const lastDeliveryPlanModel = await this.deliveryPlanModelPersistanceRepository.getLastDeliveryPlanModel()
    
    if(!lastDeliveryPlanModel){
      deliveryPlanModelId = 1
    }else {
      deliveryPlanModelId = lastDeliveryPlanModel.deliveryPlanModelId + 1
    }

    const newDeliveryPlanModel = new DeliveryPlanModel({
      deliveryPlanModelId,
      campaignId,
      deliveryPlanModelDescription
    })

    const deliveryPlanModelCreated = await this.deliveryPlanModelPersistanceRepository.createDeliveryPlanModel(newDeliveryPlanModel)

    return deliveryPlanModelCreated
  }
}