import DeliveryPlanModel from "../domain/delivery.plan.model"
import DeliveryPlanModelPersistanceRepository from "../domain/delivery.plan.model.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"

const prisma = new PrismaConnection().connection

export default class DeliveryPlanModelPrismaRepository implements DeliveryPlanModelPersistanceRepository {
  
  async createDeliveryPlanModel (deliveryPlanModel: DeliveryPlanModel): Promise<DeliveryPlanModel>{
    try {
      const deliveryPlanModelCreated = await prisma.delivery_plan_model.create({
        data: {
          delivery_plan_model_id: deliveryPlanModel.deliveryPlanModelId,
          campaign_id: deliveryPlanModel.campaignId,
          delivery_plan_model_description: deliveryPlanModel.deliveryPlanModelDescription
        }
      })

      return {
        deliveryPlanModelId: deliveryPlanModelCreated.delivery_plan_model_id,
        campaignId: deliveryPlanModelCreated.campaign_id,
        deliveryPlanModelDescription: deliveryPlanModelCreated.delivery_plan_model_description
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery Plan Model' })
    }
  }

  async getDeliveryPlanModelByCampaignId (campaignId: string): Promise<DeliveryPlanModel | null>{
    try {
      const deliveryPlanModelFound = await prisma.delivery_plan_model.findUnique({
        where: {
          campaign_id: campaignId
        }
      })
      
      if(!deliveryPlanModelFound) { return null}

      return {
        deliveryPlanModelId: deliveryPlanModelFound.delivery_plan_model_id,
        campaignId: deliveryPlanModelFound.campaign_id,
        deliveryPlanModelDescription: deliveryPlanModelFound.delivery_plan_model_description
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery Plan Model' })
    }
  }

  async deleteDeliveryPlanModel (deliveryPlanModelId: number): Promise<string>{
    try {
      const departureDetailsFound = await prisma.departure_detail.findMany({
        where:{
          delivery_plan_model_id: deliveryPlanModelId
        }
      })
      
      if(departureDetailsFound.length > 0) {
        await prisma.departure_detail.deleteMany({
          where:{
            delivery_plan_model_id: deliveryPlanModelId
          }
        })
      }
      
      const deliveryPlanModelDeleted = await prisma.delivery_plan_model.delete({
        where: {
          delivery_plan_model_id: deliveryPlanModelId
        }
      })

      return `The delivery plan model ${deliveryPlanModelDeleted.delivery_plan_model_description} was deleted`

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery Plan Model' })
    }
  }

  async getTotalNumberOfDeliveryPlanModel (): Promise<number>{
    try {
      const numOfDeliveryPlanModelFound = await prisma.delivery_plan_model.count()

      return numOfDeliveryPlanModelFound
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery Plan Model' })
    }
  }
  
  async getDeliveryPlanModelById (deliveryPlanModelId: number): Promise<DeliveryPlanModel | null>{
    try {
      const deliveryPlanModelFound = await prisma.delivery_plan_model.findUnique({
        where: {
          delivery_plan_model_id: deliveryPlanModelId
        }
      })

      if(!deliveryPlanModelFound) {return null}

      return {
        deliveryPlanModelId: deliveryPlanModelFound.delivery_plan_model_id,
        campaignId: deliveryPlanModelFound.campaign_id,
        deliveryPlanModelDescription: deliveryPlanModelFound.delivery_plan_model_description
      }

    } catch (error:any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery Plan Model' })
    }
  }
}