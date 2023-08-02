export default interface DeliveryListModel {
  deliveryId: number
  socialReason?: string
  fullNames?: string
  deliveryDateTime: Date
  providerDescription: string
  financialSourceDescription: string
  currentAccountDescription: string
  gloss: string
  deliveryAmount: number
}