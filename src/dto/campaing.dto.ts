import { IsNotEmpty, IsString } from "class-validator"

export default class CampaingDTO {

    @IsNotEmpty({ message: 'Description of campaing is empty'})
    @IsString({ message: 'Description of campaing must be a string'})
    campaingDescription: string

    @IsNotEmpty({ message: 'Type ID of campaing is empty'})
    @IsString({ message: 'Type ID of campaing must be a number'})
    campaingTypeId: number

    @IsNotEmpty({ message: 'Year of campaing is empty'})
    @IsString({ message: 'Year of campaing must be a string'})
    campaingYear: string

    @IsNotEmpty({ message: 'Period name of campaing is empty'})
    @IsString({ message: 'Period name of campaing must be a string'})
    periodName: string

    @IsNotEmpty({ message: 'Start date of campaing is empty'})
    @IsString({ message: 'Start date of campaing must be a string'})
    startDate: string

    @IsNotEmpty({ message: 'Finish date of campaing is empty'})
    @IsString({ message: 'Finish date of campaing must be a string'})
    finishDate: string

    constructor({ campaingDescription, campaingTypeId, campaingYear, periodName, startDate, finishDate}:{campaingDescription: string, campaingTypeId: number, campaingYear: string, periodName: string, startDate: string, finishDate: string}) {
        this.campaingDescription = campaingDescription
        this.campaingTypeId = campaingTypeId
        this.campaingYear = campaingYear
        this.periodName = periodName
        this.startDate = startDate
        this.finishDate = finishDate
    }
}