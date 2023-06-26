import CampaignList from "./campaign.list.model"
import Campaign from "./campaign.model"
import CampaignType from "../../campaing-type/domain/campaign.type.model"

export default interface CampaignPersistanceRepository {

    createCampaign: (campaign: Campaign) => Promise<Campaign>
    deleteCampaign: (campaignId: string) => Promise<string>
    getCampaignByYearAndType: (campaignYear: string, campaignTypeId: number) => Promise<Campaign[]>
    listCampaign: () => Promise <CampaignList[]>
    listCampaignById: (campaignId: string) => Promise<CampaignList[]>
    listCampaignByYear: (campaignYear: string) => Promise<CampaignList[]>

}