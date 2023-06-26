import CampaignType from "../domain/campaign.type.model";
import CampaignTypePersistanceRepository from "../domain/campaign.type.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";

const prisma = new PrismaConnection().connection

export default class CampaignTypePrismaRepository implements CampaignTypePersistanceRepository{
  
  async getCampaignTypeById(campaignTypeId: number): Promise<CampaignType | null> {
    try {
      const campaignTypeFound = await prisma.campaign_type.findUnique({
        where: {
          campaign_type_id: campaignTypeId
        }
      })

      if (!campaignTypeFound) { return null }

      return {
        campaignTypeId: campaignTypeFound.campaign_type_id,
        campaignTypeDescription: campaignTypeFound.campaign_type_description,
        periodQuantity: campaignTypeFound.period_quantity
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }

}