export default interface CreditRequestList {
  creditRequestId: string
  campaignId: string
  farmerId: string
  fullNames?: string
  socialReason?: string
  creditAmount: number
  createDateTime: Date
  updateStatusDateTime?: Date
  creditRequestStatus: string
}