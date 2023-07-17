import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import DepartureDetailCreate from "../domain/departure.detail.create.model"
import DepartureDetailList from "../domain/departure.detail.list.model"

const prisma = new PrismaConnection().connection

export default class DepartureDetailPrismaRepository implements DepartureDetailPersistanceRepository {

  async createDepartureDetail ({departureDetail}:{departureDetail: DepartureDetailCreate}): Promise<DepartureDetailList>{
    try {
      const departureDetailCreated = await prisma.departure_detail.create({
        data: {
          delivery_plan_model_id: departureDetail.deliveryPlanModelId,
          departure_detail_description: departureDetail.departureDetailDescription,
          departure_type: departureDetail.departureType,
          resource: departureDetail.resource,
          amount_per_hectare: departureDetail.amountPerHectare
        }
      })

      return {
        departureDetailId: departureDetailCreated.departure_detail_id,
        deliveryPlanModelId: departureDetailCreated.delivery_plan_model_id,
        departureDetailDescription: departureDetailCreated.departure_detail_description,
        departureType: departureDetailCreated.departure_type,
        resource: departureDetailCreated.resource,
        amountPerHectare: Number(departureDetailCreated.amount_per_hectare)
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Departure Detail' })
    }
  }

  async listDepartureDetail ({deliveryPlanModelId}:{deliveryPlanModelId: number}): Promise<DepartureDetailList[]>{
    try {
      const departureDetailList = await prisma.departure_detail.findMany({
        where: {
          delivery_plan_model_id: deliveryPlanModelId
        }
      })

      return departureDetailList.map(departure => {
        return {
          departureDetailId: departure.departure_detail_id,
          deliveryPlanModelId: departure.delivery_plan_model_id,
          departureDetailDescription: departure.departure_detail_description,
          departureType: departure.departure_type,
          resource: departure.resource,
          amountPerHectare: Number(departure.amount_per_hectare)
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Departure Detail' })
    }
  }

  async deleteDepartureDetail ({departureDetailId}:{departureDetailId: number}): Promise<DepartureDetailList>{
    try {
      const departureDetailDeleted = await prisma.departure_detail.delete({
        where: {
          departure_detail_id: departureDetailId
        }
      })

      return {
        departureDetailId: departureDetailDeleted.departure_detail_id,
        deliveryPlanModelId: departureDetailDeleted.delivery_plan_model_id,
        departureDetailDescription: departureDetailDeleted.departure_detail_description,
        departureType: departureDetailDeleted.departure_type,
        resource: departureDetailDeleted.resource,
        amountPerHectare: Number(departureDetailDeleted.amount_per_hectare)
      }
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Departure Detail' })
    }
  }

  async getDepartureDetailByCampaignId ({campaignId}:{campaignId: string}): Promise<DepartureDetailList[] | null>{
    try {
      const departureDetailFound = await prisma.delivery_plan_model.findUnique({
        where: {
          campaign_id: campaignId
        },
        select: {
          departure_detail: true
        }
      })

      if(!departureDetailFound) { return null }

      return departureDetailFound.departure_detail.map(departure => {
        return {
          departureDetailId: departure.departure_detail_id,
          deliveryPlanModelId: departure.delivery_plan_model_id,
          departureDetailDescription: departure.departure_detail_description,
          departureType: departure.departure_type,
          resource: departure.resource,
          amountPerHectare: Number(departure.amount_per_hectare),
        }
      })
      
    } catch (error:any) {
      throw new UnavailableError({ message: error.message, core: 'Departure Detail' })
    }
  }
}