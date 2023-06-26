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
    periodName, 
    startDate, 
    finishDate
  }:{
    campaignDescription: string, 
    campaignTypeId: number, 
    campaignYear: string, 
    periodName: string, 
    startDate: string, 
    finishDate: string
  }): Promise<Campaign> {
    
    const campaignTypeFound = await this.campaignTypePersistanceRepository.getCampaignTypeById(campaignTypeId)
    if(!campaignTypeFound){
      throw new BadRequestError({ message: 'Campaign Type ID does not exist', core: 'Campaign'})
    }

    const numOfCampaignByYear = await this.campaignPersistanceRepository.getCampaignByYearAndType(campaignYear, campaignTypeId)
    if(numOfCampaignByYear.length >= campaignTypeFound.periodQuantity){
      throw new ProcessError({ message: 'Has exceeded the number of campaigns for this year', core: 'Campaign'})
    }

    const campaignId = campaignTypeFound.campaignTypeDescription.split(' ')[0].slice(0, 3)+'0'+periodName.trim().slice(-1)+campaignYear
            
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