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

    @IsNotEmpty({ message: 'Period name of campaign is empty'})
    @IsString({ message: 'Period name of campaign must be a string'})
      periodName: string

    @IsNotEmpty({ message: 'Start date of campaign is empty'})
    @IsString({ message: 'Start date of campaign must be a string'})
      startDate: string

    @IsNotEmpty({ message: 'Finish date of campaign is empty'})
    @IsString({ message: 'Finish date of campaign must be a string'})
      finishDate: string

    constructor({ campaignDescription, campaignTypeId, campaignYear, periodName, startDate, finishDate}:{campaignDescription: string, campaignTypeId: number, campaignYear: string, periodName: string, startDate: string, finishDate: string}) {
      this.campaignDescription = campaignDescription
      this.campaignTypeId = campaignTypeId
      this.campaignYear = campaignYear
      this.periodName = periodName
      this.startDate = startDate
      this.finishDate = finishDate
    }
}