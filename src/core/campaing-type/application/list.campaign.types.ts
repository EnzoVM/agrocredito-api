import CampaignType from "../domain/campaign.type.model"
import CampaignTypePersistanceRepository from "../domain/campaign.type.persistance.repository"

export default class ListCampaignTypes {
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async list (): Promise<CampaignType[]> {

    const campaignTypeFound = await this.campaignTypePersistanceRepository.listCampaignType()

    return campaignTypeFound
  }
}