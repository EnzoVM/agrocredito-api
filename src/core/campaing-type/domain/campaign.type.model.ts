
export default class CampaignType {
  campaignTypeId: number
  campaignTypeDescription: string
  periodQuantity: number

  constructor({
    campaignTypeId, 
    campaignTypeDescription, 
    periodQuantity
  }:{
    campaignTypeId: number, 
    campaignTypeDescription: string, 
    periodQuantity: number
  }) {
    this.campaignTypeId = campaignTypeId
    this.campaignTypeDescription = campaignTypeDescription
    this.periodQuantity = periodQuantity
  }   
}