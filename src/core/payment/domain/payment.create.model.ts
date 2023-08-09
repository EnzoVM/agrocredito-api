export default interface PaymentCreateModel {
  creditRequestId: string
  paymentDateTime: Date
  financialSourceId: number
  currentAccountId: number
  paymentDescription: string
  paymentAmountUSD: number
  paymentAmountPEN: number
}