import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export default class CampaignDTO {

    @IsNotEmpty({ message: 'Description of campaign is empty'})
    @IsString({ message: 'Description of campaign must be a string'})
      campaignDescription: string

    @IsNotEmpty({ message: 'Type ID of campaign is empty'})
    @IsNumber({}, { message: 'Type ID of campaign must be a number'})
      campaignTypeId: number

    @IsNotEmpty({ message: 'Year of campaign is empty'})
    @IsString({ message: 'Year of campaign must be a string'})
      campaignYear: string

    @IsNotEmpty({ message: 'Start date of campaign is empty'})
    @IsString({ message: 'Start date of campaign must be a string'})
      startDate: string

    @IsNotEmpty({ message: 'Finish date of campaign is empty'})
    @IsString({ message: 'Finish date of campaign must be a string'})
      finishDate: string

    @IsNotEmpty({ message: 'Interest of campaign is empty'})
    @IsNumber({}, { message: 'Interest of campaign must be a number'})
      campaignInterest: number

    constructor({ 
      campaignDescription, 
      campaignTypeId, 
      campaignYear, 
      startDate, 
      finishDate,
      campaignInterest
    }:{
      campaignDescription: string, 
      campaignTypeId: number, 
      campaignYear: string, 
      startDate: string, 
      finishDate: string,
      campaignInterest: number
    }) {
      this.campaignDescription = campaignDescription
      this.campaignTypeId = campaignTypeId
      this.campaignYear = campaignYear
      this.startDate = startDate
      this.finishDate = finishDate
      this.campaignInterest = campaignInterest
    }
}