
export default class CampaignList {
  campaignId: string
  campaignDescription: string
  campaignTypeDescription: string
  campaignYear: string
  periodName: string
  startDate: string
  finishDate: string

  constructor({
    campaignId, 
    campaignDescription, 
    campaignTypeDescription, 
    campaignYear, 
    periodName, 
    startDate, 
    finishDate
  }:{
    campaignId: string, 
    campaignDescription: string, 
    campaignTypeDescription: string, 
    campaignYear: string, 
    periodName: string, 
    startDate: string, 
    finishDate: string
  }) {
    this.campaignId = campaignId
    this.campaignDescription = campaignDescription
    this.campaignTypeDescription = campaignTypeDescription
    this.campaignYear = campaignYear
    this.periodName = periodName
    this.startDate = startDate
    this.finishDate = finishDate        
  }
}