export default interface DeliveryResponseModel {
  deliveryId: number
  creditRequestId: string
  deliveryDatetime: string
  providerId: number
  financialSourceId: number
  currentAccountId: number
  gloss: string
  deliveryAmount: number
}