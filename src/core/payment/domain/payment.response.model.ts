export default interface PaymentResponseModel {
  paymentId: number
  creditRequestId: string
  paymentDateTime: string
  financialSourceId: number
  currentAccountId: number
  paymentDescription: string
  paymentAmountUSD: number
  paymentAmountPEN: number
}