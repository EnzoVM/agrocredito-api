
export default class Campaign {
  campaignId: string
  campaignDescription: string
  campaignTypeId: number
  campaignYear: string
  periodName: string
  startDate: string
  finishDate: string

  constructor({
    campaignId, 
    campaignDescription, 
    campaignTypeId, 
    campaignYear, 
    periodName, 
    startDate, 
    finishDate
  }:{
    campaignId: string, 
    campaignDescription: string, 
    campaignTypeId: number, 
    campaignYear: string, 
    periodName: string, 
    startDate: string, 
    finishDate: string
  }) {
    this.campaignId = campaignId
    this.campaignDescription = campaignDescription
    this.campaignTypeId = campaignTypeId
    this.campaignYear = campaignYear
    this.periodName = periodName
    this.startDate = startDate
    this.finishDate = finishDate        
  }
}