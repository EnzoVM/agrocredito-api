import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import DeliveryPlanModel from "../domain/delivery.plan.model"
import DeliveryPlanModelPersistanceRepository from "../domain/delivery.plan.model.persistance.repository"
import CampaignPersistanceRepository from "../../campaign/domain/campaign.persistance.repository"

export default class CreateDeliveryPlanModelUseCase {
  constructor(
    private readonly deliveryPlanModelPersistanceRepository: DeliveryPlanModelPersistanceRepository,
    private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  ) {}

  async invoke ({
    campaignId, 
    deliveryPlanModelDescription
  }:{
    campaignId: string, 
    deliveryPlanModelDescription: string
  }): Promise<DeliveryPlanModel> {
    
    if(!campaignId || !deliveryPlanModelDescription){
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery Plan Model'})
    }

    if(typeof campaignId !== 'string' || typeof deliveryPlanModelDescription !== 'string'){
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Delivery Plan Model'})
    }

    const campaignFound = await this.campaignPersistanceRepository.getCampaignById(campaignId)
    if(!campaignFound){
      throw new BadRequestError({ message: 'There is no campaign', core: 'Delivery Plan Model'})
    }
    
    const deliveryPlanModelFound = await this.deliveryPlanModelPersistanceRepository.getDeliveryPlanModelByCampaignId(campaignId)
    if(deliveryPlanModelFound) {
      throw new ProcessError({ message: 'You can only create 1 delivery plan template per campaign', core: 'Delivery Plan Model'})
    }
    
    const deliveryPlanModelId = await this.deliveryPlanModelPersistanceRepository.getTotalNumberOfDeliveryPlanModel() + 1
    
    const newDeliveryPlanModel = new DeliveryPlanModel({
      deliveryPlanModelId,
      campaignId,
      deliveryPlanModelDescription
    })

    const deliveryPlanModelCreated = await this.deliveryPlanModelPersistanceRepository.createDeliveryPlanModel(newDeliveryPlanModel)

    return deliveryPlanModelCreated
  }
}