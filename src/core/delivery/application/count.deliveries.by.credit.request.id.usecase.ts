import DeliveryPersistanceRepository from "../domain/delivery.persistance.respository"

export default class CountDeliveriesByCreditRequestIdUseCase {
  
  constructor(
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository
  ) {}

  async invoke ({creditRequestId}:{creditRequestId: string}): Promise<number> {
    const deliveriesCount = await this.deliveryPersistanceRepository.countDeliveriesByCreditRequestId({creditRequestId})
    return deliveriesCount
  }
}