export default interface CreditRelation {
  creditRequestId: string
  farmerId: string
  fullNames?: string
  socialReason?: string
  totalDelivery: number
  interest: number
  delinquentInterest: number
  capital: number
}