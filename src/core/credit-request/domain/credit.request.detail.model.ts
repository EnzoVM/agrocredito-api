export default interface CreditRequestDetail {
  creditRequestId: string
  farmerId: string
  farmerFullNames?: string
  farmerSocialReason?: string
  campaignId: string
  hectareNumber: number
  creditReason: string
  creditAmount: number
  guaranteeDescription: string
  guaranteeAmount: number
  technicalName: string
  assistanceTypeDescription: string
  creditRequestStatus: string
  creditRequestObservation: string
  createDateTime: Date
  updateStatusDateTime?: Date
}