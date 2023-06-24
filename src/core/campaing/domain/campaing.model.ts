
export default class Campaing {
    campaingId: string
    campaingDescription: string
    campaingTypeId: number
    campaingYear: string
    periodName: string
    startDate: string
    finishDate: string

    constructor({campaingId, campaingDescription, campaingTypeId, campaingYear, periodName, startDate, finishDate}:{campaingId: string, campaingDescription: string, campaingTypeId: number, campaingYear: string, periodName: string, startDate: string, finishDate: string}) {
        this.campaingId = campaingId
        this.campaingDescription = campaingDescription
        this.campaingTypeId = campaingTypeId
        this.campaingYear = campaingYear
        this.periodName = periodName
        this.startDate = startDate
        this.finishDate = finishDate        
    }
}