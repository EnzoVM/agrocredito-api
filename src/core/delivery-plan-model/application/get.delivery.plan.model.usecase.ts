import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import DeliveryPlanModelList from "../domain/delivery.plan.model.list.model"
import DeliveryPlanModelPersistanceRepository from "../domain/delivery.plan.model.persistance.repository"

export default class GetDeliveryPlanModelUseCase {

  constructor(
    private readonly deliveryPlanModelPersistanceRepository: DeliveryPlanModelPersistanceRepository
  ) {}

  async invoke ({
    campaignId
  }:{
    campaignId: string
  }): Promise<DeliveryPlanModelList> {

    const deliveryPlanModelFound = await this.deliveryPlanModelPersistanceRepository.getDeliveryPlanModelByCampaignId({campaignId})
    if(!deliveryPlanModelFound){
      throw new ProcessError({ message: 'There is no delivery plan template assigned to this campaign', core: 'Delivery Plan Model'})
    }

    return deliveryPlanModelFound
  }
}