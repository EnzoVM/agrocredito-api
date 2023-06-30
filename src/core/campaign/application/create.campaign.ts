import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import Campaign from "../domain/campaign.model"
import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignTypePersistanceRepository from "../../campaing-type/domain/campaign.type.persistance.repository"

export default class CreateCampaign {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository, campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async create ({
    campaignDescription, 
    campaignTypeId, 
    campaignYear,
    startDate, 
    finishDate
  }:{
    campaignDescription: string,
    campaignTypeId: number,
    campaignYear: string,
    startDate: string,
    finishDate: string
  }): Promise<Campaign> {
    
    const campaignTypeFound = await this.campaignTypePersistanceRepository.getCampaignTypeById(campaignTypeId)
    if(!campaignTypeFound){
      throw new BadRequestError({ message: 'Id of the campaign does not exist', core: 'Campaign'})
    }

    const campaignByYear = await this.campaignPersistanceRepository.getCampaignByYearAndType(campaignYear, campaignTypeId)
    const numberOfCampaignByYear = campaignByYear.length
  
    if(numberOfCampaignByYear >= campaignTypeFound.periodQuantity){
      throw new ProcessError({ message: 'Has exceeded the number of campaigns for this year', core: 'Campaign'})
    }

    const periodName = `Periodo ${numberOfCampaignByYear + 1}`
    const campaignId = campaignTypeFound.campaignTypeDescription.split(' ')[0].slice(0, 3)+'0'+periodName.trim().slice(-1)+campaignYear

    const startDateNumberToSave = Number(`${startDate.split('/').join('')}`)

    const startDateNumberForValidation = Number(`${startDate.split('/').reverse().join('')}`)
    const finishDateNumberForValidation = Number(`${finishDate.split('/').reverse().join('')}`)

    if (startDateNumberForValidation >= finishDateNumberForValidation) {
      throw new BadRequestError({ message: 'Start date dont must to be grater than finish date', core: 'Campaign'})
    }

    const finishDatesNumber = campaignByYear.map(campaign => {
      return Number(`${campaign.finishDate.split('/').join('')}`)
    })

    console.log('finish:', finishDatesNumber)

    const startDateIsValid = finishDatesNumber.every((finishDate) => finishDate < startDateNumberToSave)

    if (!startDateIsValid) {
      throw new ProcessError({ message: 'The start date must be grater than the finish date of the last campaign', core: 'Campaign'})
    }
  
    const newCampaign = new Campaign({
      campaignId,
      campaignDescription,
      campaignTypeId,
      campaignYear,
      periodName,
      startDate,
      finishDate
    })

    const campaignCreated = await this.campaignPersistanceRepository.createCampaign(newCampaign)

    return campaignCreated
  }
}