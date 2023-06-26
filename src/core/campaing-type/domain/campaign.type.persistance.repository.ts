import CampaignType from "./campaign.type.model";

export default interface CampaignTypePersistanceRepository {

  getCampaignTypeById: (campaignTypeId: number) => Promise<CampaignType | null>
  
}