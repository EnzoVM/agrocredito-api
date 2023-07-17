
export default interface CreditRequestCreate {
  creditRequestId: string
  farmerId: string
  campaignId: string
  hectareNumber: number
  creditReason: string
  creditAmount: number
  guaranteeDescription: string
  guaranteeAmount: number
  technicalId: number
  creditRequestStatus?: string
  creditRequestObservation: string
}