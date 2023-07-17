
export default class CreditRequest {
  creditRequestId: string
  farmerId: string
  campaignId: string
  hectareNumber: number
  creditReason: string
  creditAmount: number
  guaranteeDescription: string
  guaranteeAmount: number
  technicalId: number
  creditRequestStatus: string
  creditRequestObservation: string

  constructor({ 
    creditRequestId, 
    farmerId, 
    campaignId, 
    hectareNumber, 
    creditReason, 
    creditAmount, 
    guaranteeDescription, 
    guaranteeAmount, 
    technicalId, 
    creditRequestStatus, 
    creditRequestObservation 
  }: { 
    creditRequestId: string, 
    farmerId: string, 
    campaignId: string, 
    hectareNumber: number, 
    creditReason: string, 
    creditAmount: number, 
    guaranteeDescription: string, 
    guaranteeAmount: number, 
    technicalId: number, 
    creditRequestStatus: string, 
    creditRequestObservation: string 
  }) {
    this.creditRequestId = creditRequestId
    this.farmerId = farmerId
    this.campaignId = campaignId
    this.hectareNumber = hectareNumber
    this.creditReason = creditReason
    this.creditAmount = creditAmount
    this.guaranteeDescription = guaranteeDescription
    this.guaranteeAmount = guaranteeAmount
    this.technicalId = technicalId
    this.creditRequestStatus = creditRequestStatus
    this.creditRequestObservation = creditRequestObservation
  }
}