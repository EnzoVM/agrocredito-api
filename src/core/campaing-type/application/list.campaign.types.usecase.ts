import CampaignType from "../domain/campaign.type.model"
import CampaignTypePersistanceRepository from "../domain/campaign.type.persistance.repository"

export default class ListCampaignTypesUseCase {
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async invoke (): Promise<CampaignType[]> {

    const campaignTypeFound = await this.campaignTypePersistanceRepository.listCampaignType()

    return campaignTypeFound
  }
}