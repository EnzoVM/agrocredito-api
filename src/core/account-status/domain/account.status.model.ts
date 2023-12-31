export default interface AccountStatusModel {
  campaignFinishDate: string
  amountDelivered: number
  amountDeliveredPercentage: number
  creditAmount: number
  capital: number
  interest: number
  interesPercentage: number
  delinquentInterest: number
  delinquentInterestPercentage: number
  totalPayment: number
  finalDebt: number
  payments: Payment[]
  deliveries: Delivery[]
  farmerData: {
    farmerId: string
    fullNames?: string
    socialReason?: string
  }
  campaignId: string
  creditRequesId: string
}

export interface Payment {
  transactionDateTime: Date,
  paymentAmount: number
}

export interface Delivery {
  deliveryDateTime: Date,
  deliveryAmount: number
}