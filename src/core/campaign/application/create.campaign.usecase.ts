import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import Campaign from "../domain/campaign.model"
import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignTypePersistanceRepository from "../../campaing-type/domain/campaign.type.persistance.repository"

export default class CreateCampaignUseCase {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository, campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async invoke ({
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

    const [startDateDay, startDateMonth] = startDate.split('/').map(Number)
    const [finishDateDay, finishDateMonth] = finishDate.split('/').map(Number)

    if(startDateDay <= 0 ||  startDateDay > 31 || finishDateDay <= 0 || finishDateDay > 31) {
      throw new BadRequestError({ message: 'Day cannot be less than 0 or greater than 31', core: 'Campaign'})
    }
    if(startDateMonth <= 0 ||  startDateMonth > 12 || finishDateMonth <= 0 || finishDateMonth > 12) {
      throw new BadRequestError({ message: 'Month cannot be less than 0 or greater than 12', core: 'Campaign'})
    }

    const startDateNumberToSave = Number(`${startDate.split('/').join('')}`)

    const startDateNumberForValidation = Number(`${startDate.split('/').reverse().join('')}`)
    const finishDateNumberForValidation = Number(`${finishDate.split('/').reverse().join('')}`)
    
    if (startDateNumberForValidation >= finishDateNumberForValidation) {
      throw new BadRequestError({ message: 'Start date dont must to be grater than finish date', core: 'Campaign'})
    }

    const finishDatesNumber = campaignByYear.map(campaign => {
      return Number(`${campaign.finishDate.split('/').join('')}`)
    })

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