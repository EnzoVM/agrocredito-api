import DeliveryListModel from "./delivery.list.model"

export default interface DeliveryPersistanceRepository {
  listDeliveries: ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
  listDeliveriesByCreditRequestId: ({ creditRequestId }: { creditRequestId: string }) => Promise<DeliveryListModel[]>
}