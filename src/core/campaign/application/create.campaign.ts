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

    const datesNumber = campaignByYear.map(campaign => {
      return Number(`${campaign.startDate.split('/').join('')}${campaign.finishDate.split('/').join('')}`)
    })

    const dateNumberToSave = Number(`${startDate.split('/').join('')}${finishDate.split('/').join('')}`)

    console.log(dateNumberToSave, datesNumber[0])

    const areDatesNoOverlap = datesNumber.every((dateNumber) => dateNumberToSave > dateNumber)


    if (areDatesNoOverlap) {
      throw new ProcessError({ message: 'The dates are overlap with other campaign', core: 'Campaign'})
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

    // const campaignCreated = await this.campaignPersistanceRepository.createCampaign(newCampaign)

    return {
      campaignDescription: '',
      campaignId: '',
      campaignTypeId: 1,
      campaignYear: '',
      finishDate: '',
      periodName: '',
      startDate: ''
    }
  }
}