export default interface DeliveryCreateModel {
  creditRequestId: string
  deliveryDatetime: Date
  providerId: number
  financialSourceId: number
  currentAccountId: number
  gloss: string
  deliveryAmount: number
}