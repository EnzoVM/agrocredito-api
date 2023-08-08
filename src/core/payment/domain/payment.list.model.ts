export default interface PaymentListModel {
  paymentId: number
  socialReason?: string
  fullNames?: string
  deliveryDateTime: Date
  financialSourceDescription: string
  currentAccountDescription: string
  paymentDescription: string
  paymentAmount: number
}