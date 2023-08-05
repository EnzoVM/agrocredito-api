export default interface AccountStatusModel {
  amountDelivered: number
  amountDeliveredPercentage: number
  creditAmount: number
  interest: number
  totalPayment: number
  finalDebt: number
  payments: Payment[]
}

export interface Payment {
  transactionDateTime: Date,
  paymentAmount: number
}