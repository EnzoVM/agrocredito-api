import DeliveryPlanModelPersistanceRepository from "../domain/delivery.plan.model.persistance.repository"

export default class DeleteDeliveryPlanModelUseCase {
  constructor(
    private readonly deliveryPlanModelPersistanceRepository: DeliveryPlanModelPersistanceRepository 
  ) {}

  async invoke ({
    deliveryPlanModelId
  }:{
    deliveryPlanModelId: number
  }): Promise<string> {
    
    const deliveryPlanModelMessageDeleted = await this.deliveryPlanModelPersistanceRepository.deleteDeliveryPlanModel(deliveryPlanModelId)
    return deliveryPlanModelMessageDeleted
  }
}