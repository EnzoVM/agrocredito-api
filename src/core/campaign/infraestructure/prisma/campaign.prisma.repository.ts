import Campaign from "../../domain/campaign.model"
import CampaignPersistanceRepository from "../../domain/campaign.persistance.repository"
import PrismaConnection from "../../../../prisma/prisma.connection"
import UnavailableError from "../../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import CampaignList from "../../domain/campaign.list.model"

const prisma = new PrismaConnection().connection

export default class CampaignPrismaRepository implements CampaignPersistanceRepository {

  async createCampaign(campaign: Campaign): Promise<Campaign> {
    try {
      const campaignCreated = await prisma.campaign.create({
        data: {
          campaign_id: campaign.campaignId,
          campaign_description: campaign.campaignDescription,
          campaign_type_id: campaign.campaignTypeId,
          campaign_year: campaign.campaignYear,
          period_name: campaign.periodName,
          start_date: campaign.startDate,
          finish_date: campaign.finishDate
        }
      })
      
      return {
        campaignId: campaignCreated.campaign_id,
        campaignDescription: campaignCreated.campaign_description,
        campaignTypeId: campaignCreated.campaign_type_id,
        campaignYear: campaignCreated.campaign_year,
        periodName: campaignCreated.period_name,
        startDate: campaignCreated.start_date,
        finishDate: campaignCreated.finish_date
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }


  async deleteCampaign(campaignId: string): Promise<string> {
    try {
      const deliveryPlanModelFound = await prisma.delivery_plan_model.findUnique({
        where:{
          campaign_id: campaignId
        }
      })
      
      if(deliveryPlanModelFound){
        await prisma.departure_detail.deleteMany({
          where: {
            delivery_plan_model_id: deliveryPlanModelFound.delivery_plan_model_id
          }
        })
        await prisma.delivery_plan_model.delete({
          where: {
            campaign_id: campaignId
          }
        })
      }
    
      const campaignDeleted = await prisma.campaign.delete({
        where: {
          campaign_id: campaignId
        }
      })

      return `The Campaign ${campaignDeleted.campaign_description} was deleted`

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }

  
  async getCampaignByYearAndType(campaignYear: string, campaignTypeId: number): Promise<Campaign[]> {
    try {
      const campaignListFound = await prisma.campaign.findMany({
        where: {
          campaign_year: campaignYear,
          campaign_type_id: campaignTypeId
        }
      })

      return campaignListFound.map(campaign => {
        return {
          campaignId: campaign.campaign_id,
          campaignDescription: campaign.campaign_description,
          campaignTypeId: campaign.campaign_type_id,
          campaignYear: campaign.campaign_year,
          periodName: campaign.period_name,
          startDate: campaign.start_date,
          finishDate: campaign.finish_date
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }


  async listCampaign(): Promise<{ campaign: CampaignList[], count: number }> {
    try {
      const campaignList = await prisma.campaign.findMany({
        include: {
          campaign_type: true
        },
        orderBy: {
          campaign_year: 'desc'
        }
      })

      const count = campaignList.length

      const campaign = campaignList.map(campaign => {
        return {
          campaignId: campaign.campaign_id,
          campaignDescription: campaign.campaign_description,
          campaignTypeDescription: campaign.campaign_type.campaign_type_description,
          campaignYear: campaign.campaign_year,
          periodName: campaign.period_name,
          startDate: campaign.start_date,
          finishDate: campaign.finish_date
        }
      })

      return {
        campaign,
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }


  async listCampaignById (campaignId: string): Promise<{ campaign: CampaignList[], count: number }>{
    try {
      const campaignListFound = await prisma.campaign.findMany({
        where:{
          campaign_id: {
            startsWith: campaignId
          }
        },
        include: {
          campaign_type: true
        },
        orderBy: {
          campaign_year: 'desc'
        }
      })

      const count = campaignListFound.length

      const campaign = campaignListFound.map(campaign => {
        return {
          campaignId: campaign.campaign_id,
          campaignDescription: campaign.campaign_description,
          campaignTypeDescription: campaign.campaign_type.campaign_type_description,
          campaignYear: campaign.campaign_year,
          periodName: campaign.period_name,
          startDate: campaign.start_date,
          finishDate: campaign.finish_date
        }
      })

      return {
        campaign,
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }


  async listCampaignByYear (campaignYear: string): Promise<{ campaign: CampaignList[], count: number }>{
    try {
      const campaignListFound = await prisma.campaign.findMany({
        where:{
          campaign_year: {
            startsWith: campaignYear
          }
        },
        include: {
          campaign_type: true
        },
        orderBy: {
          campaign_year: 'desc'
        }
      })

      const count = campaignListFound.length

      const campaign = campaignListFound.map(campaign => {
        return {
          campaignId: campaign.campaign_id,
          campaignDescription: campaign.campaign_description,
          campaignTypeDescription: campaign.campaign_type.campaign_type_description,
          campaignYear: campaign.campaign_year,
          periodName: campaign.period_name,
          startDate: campaign.start_date,
          finishDate: campaign.finish_date
        }
      })

      return {
        campaign,
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign' })
    }
  }

  async getCampaignById (campaignId: string): Promise<Campaign | null>{
    try {
      const campaignFound = await prisma.campaign.findUnique({
        where: {
          campaign_id: campaignId
        }
      })

      if(!campaignFound) {return null}

      return {
        campaignId: campaignFound.campaign_id,
        campaignDescription: campaignFound.campaign_description,
        campaignTypeId: campaignFound.campaign_type_id,
        campaignYear: campaignFound.campaign_year,
        periodName: campaignFound.period_name,
        startDate: campaignFound.start_date,
        finishDate: campaignFound.finish_date
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Campaign'})
    }
  }
}