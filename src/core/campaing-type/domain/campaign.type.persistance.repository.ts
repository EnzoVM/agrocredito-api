import CampaignType from "./campaign.type.model"

export default interface CampaignTypePersistanceRepository {

  listCampaignType: () => Promise<CampaignType[]>
  getCampaignTypeById: (campaignTypeId: number) => Promise<CampaignType | null>
  
}