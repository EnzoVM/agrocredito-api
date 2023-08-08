import DeliveryCreateModel from "./delivery.create.model"
import DeliveryListModel from "./delivery.list.model"
import DeliveryResponseModel from "./delivery.response.model"

export default interface DeliveryPersistanceRepository {
  listDeliveries: ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
  listDeliveriesByCreditRequestId: ({ creditRequestId }: { creditRequestId: string }) => Promise<DeliveryListModel[]>
  createDelivery: ({delivery}:{delivery: DeliveryCreateModel}) => Promise<DeliveryResponseModel>
  countDeliveriesByCreditRequestId: ({creditRequestId}:{creditRequestId: string}) => Promise<number>
  getTotalAmountByCampaignId ({ campaignId }: { campaignId: string }): Promise<number>
}