export default interface AccountStatusModel {
  amountDelivered: number
  amountDeliveredPercentage: number
  creditAmount: number
  interest: number
  interesPercentage: number
  delinquentInterest: number
  delinquentInterestPercentage: number
  totalPayment: number
  finalDebt: number
  payments: Payment[],
  deliveries: Delivery[]
}

export interface Payment {
  transactionDateTime: Date,
  paymentAmount: number
}

export interface Delivery {
  deliveryDateTime: Date,
  deliveryAmount: number
}