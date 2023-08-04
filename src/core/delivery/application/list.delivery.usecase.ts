import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import { FarmerType } from "../../farmer/domain/farmer.type"
import DeliveryListModel from "../domain/delivery.list.model"
import DeliveryPersistanceRepository from "../domain/delivery.persistance.respository"

export default class ListDeliveryUseCase {
  constructor (private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository) {}

  async list ({ 
    campaignId,
    farmerType, 
    fullNames, 
    socialReason,
    page,
    limit
  } : { 
    campaignId: string,
    farmerType: FarmerType, 
    fullNames?: string, 
    socialReason?: string,
    page: number,
    limit: number
  }) {
    if (
      typeof campaignId === 'undefined' ||
      typeof farmerType === 'undefined' ||
      typeof page === 'undefined' ||
      typeof limit === 'undefined'
    ) {
      throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
    }

    if (!Object.values(FarmerType).includes(farmerType)) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    let finalCount: number = 0
    let finalDeliveries: DeliveryListModel[] = []

    if (farmerType === FarmerType.INDIVIDUAL) {
      if (typeof fullNames === 'undefined') {
        throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
      }

      const { deliveries, count } = await this.deliveryPersistanceRepository.listDeliveries({ campaignId, farmerType, fullNames })
      finalDeliveries = deliveries
      finalCount = count
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      if (typeof socialReason === 'undefined') {
        throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
      }
  
      const { deliveries, count } = await this.deliveryPersistanceRepository.listDeliveries({ campaignId, farmerType, socialReason })
  
      finalDeliveries = deliveries
      finalCount = count
    }

    if (farmerType === FarmerType.ALL) {  
      const { deliveries, count } = await this.deliveryPersistanceRepository.listDeliveries({ campaignId, farmerType })
  
      finalDeliveries = deliveries
      finalCount = count
    }

    if (limit > 0) {
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      finalDeliveries = finalDeliveries.slice(startIndex, endIndex)
    }

    return {
      deliveries: finalDeliveries,
      count: finalCount
    }
  }
}