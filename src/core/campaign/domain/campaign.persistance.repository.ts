import CampaignList from "./campaign.list.model"
import Campaign from "./campaign.model"

export default interface CampaignPersistanceRepository {

    createCampaign: (campaign: Campaign) => Promise<Campaign>
    deleteCampaign: (campaignId: string) => Promise<string>
    getCampaignByYearAndType: (campaignYear: string, campaignTypeId: number) => Promise<Campaign[]>
    listCampaign: () => Promise <{ campaign: CampaignList[], count: number }>
    listCampaignById: (campaignId: string) => Promise<{ campaign: CampaignList[], count: number }>
    listCampaignByYear: (campaignYear: string) => Promise<{ campaign: CampaignList[], count: number }>
    getCampaignById: (campaignId: string) => Promise<Campaign | null>

}