import DeliveryListModel from "./delivery.list.model"

export default interface DeliveryPersistanceRepository {
  listDeliveriesByFullNames: ({ fullNames }: { fullNames: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
  listDeliveriesBySocialReason: ({ socialReason }: { socialReason: string }) => Promise<{ deliveries: DeliveryListModel[], count: number }>
}