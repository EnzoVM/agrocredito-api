export default interface CreditRequestList {
  campaignId: string
  fullNames?: string
  socialReason?: string
  creditAmount: number
  createDateTime: Date
  updateStatusDateTime?: Date
  creditRequestStatus: string
}