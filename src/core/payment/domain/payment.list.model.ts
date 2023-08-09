export default interface PaymentListModel {
  paymentId: number
  socialReason?: string
  fullNames?: string
  paymentDateTime: Date
  financialSourceDescription: string
  currentAccountDescription: string
  paymentDescription: string
  paymentAmount: number
}