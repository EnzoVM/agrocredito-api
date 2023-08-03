import DeliveryListModel from "./delivery.list.model"

export default interface DeliveryPersistanceRepository {
  listDeliveriesByFullNames: ({ campaignId, fullNames }: { campaignId: string, fullNames: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
  listDeliveriesBySocialReason: ({ campaignId, socialReason }: { campaignId: string, socialReason: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
}