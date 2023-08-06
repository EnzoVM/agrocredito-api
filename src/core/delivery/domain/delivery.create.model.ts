export default interface DeliveryCreateModel {
  creditRequestId: string
  providerId: number
  financialSourceId: number
  currentAccountId: number
  gloss: string
  deliveryAmount: number
}