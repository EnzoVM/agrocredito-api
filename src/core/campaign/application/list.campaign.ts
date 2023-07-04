import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import CampaignList from "../domain/campaign.list.model"

export default class ListCampaign {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
  }

  async list ({
    campaignId, 
    campaignYear, 
    page, 
    limit, 
    typeSearch
  }:{
    campaignId?: string, 
    campaignYear?: string, 
    page: number, 
    limit: number, 
    typeSearch: 'code' | 'year' | 'all'
  }): Promise<{ campaign: CampaignList[], count: number }> {
    
    let campaignList: CampaignList[] = []
    let finalCount: number = 0

    if(typeSearch === 'code') {
      if(!campaignId){
        throw new BadRequestError({ message: 'Campaing ID is missing', core: 'Campaign'})
      }
      const { campaign, count: countCampaign } = await this.campaignPersistanceRepository.listCampaignById(campaignId)
      campaignList = campaign
      finalCount = countCampaign
    }

    if(typeSearch === 'year') {
      if(!campaignYear){
        throw new BadRequestError({ message: 'Campaing year is missing', core: 'Campaign'})
      }
      const { campaign, count: countCampaign } = await this.campaignPersistanceRepository.listCampaignByYear(campaignYear)
      campaignList = campaign
      finalCount = countCampaign
    }

    if(typeSearch === 'all') {
      const { campaign, count: countCampaign } = await this.campaignPersistanceRepository.listCampaign()
      campaignList = campaign
      finalCount = countCampaign
    }
    
    const orderDataCampaign = campaignList.map((campaign) => {                    
      return {
        campaignId: campaign.campaignId,
        campaignDescription: campaign.campaignDescription,
        campaignTypeDescription: campaign.campaignTypeDescription,
        periodName: campaign.periodName,
        campaignYear: campaign.campaignYear
      }
    })
                    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const listCampaign = campaignList.slice(startIndex, endIndex)

    return {
      campaign: listCampaign,
      count: finalCount
    }

  }
}