
export default class CreditRequest {
  creditRequestId: string
  farmerId: string
  campaignId: string
  hectareNumber: number
  creditReason: string
  creditAmount: number
  guaranteeDescription: string
  guaranteeAmount: number
  tecniqueId: number
  creditRequestStatus: boolean
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
    tecniqueId, 
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
    tecniqueId: number, 
    creditRequestStatus: boolean, 
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
    this.tecniqueId = tecniqueId
    this.creditRequestStatus = creditRequestStatus
    this.creditRequestObservation = creditRequestObservation
  }
}