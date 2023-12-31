
export default class Campaign {
  campaignId: string
  campaignDescription: string
  campaignTypeId: number
  campaignYear: string
  periodName: string
  startDate: string
  finishDate: string
  campaignInterest: number
  campaignDelinquentInterest: number

  constructor({
    campaignId, 
    campaignDescription, 
    campaignTypeId, 
    campaignYear, 
    periodName, 
    startDate, 
    finishDate,
    campaignInterest,
    campaignDelinquentInterest
  }:{
    campaignId: string, 
    campaignDescription: string, 
    campaignTypeId: number, 
    campaignYear: string, 
    periodName: string, 
    startDate: string, 
    finishDate: string,
    campaignInterest: number,
    campaignDelinquentInterest: number
  }) {
    this.campaignId = campaignId
    this.campaignDescription = campaignDescription
    this.campaignTypeId = campaignTypeId
    this.campaignYear = campaignYear
    this.periodName = periodName
    this.startDate = startDate
    this.finishDate = finishDate
    this.campaignInterest = campaignInterest
    this.campaignDelinquentInterest = campaignDelinquentInterest
  }
}