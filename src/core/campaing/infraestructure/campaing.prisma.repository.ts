import Campaing from "../domain/campaing.model";
import CampaingPersistanceRepository from "../domain/campaing.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";

const prisma = new PrismaConnection().connection

export default class CampaingPrismaRepository implements CampaingPersistanceRepository {
    
    async createCampaing (campaing: Campaing): Promise<Campaing> {
        try {
            const campaingCreated = await prisma.campaing.create({
                data: {
                    campaing_id: campaing.campaingId,   
                    campaing_description: campaing.campaingDescription, 
                    campaing_type_id: campaing.campaingTypeId,
                    campaing_year: campaing.campaingYear, 
                    period_name: campaing.periodName,           
                    start_date: campaing.startDate, 
                    finish_date: campaing.finishDate    
                }
            })

            return {
                campaingId: campaingCreated.campaing_id,
                campaingDescription: campaingCreated.campaing_description,
                campaingTypeId: campaingCreated.campaing_type_id,
                campaingYear: campaingCreated.campaing_year,
                periodName: campaingCreated.period_name,
                startDate: campaingCreated.start_date,
                finishDate: campaingCreated.finish_date
            }

        } catch (error: any) {
            throw new UnavailableError({message: error.message, core: 'Campaing'})
        }
    }
    
    
    async deleteCampaing (campaingId: string): Promise<Campaing> {
        try {
            const campaingDeleted = await prisma.campaing.delete({
                where: {
                    campaing_id: campaingId
                }
            })

            return {
                campaingId: campaingDeleted.campaing_id,
                campaingDescription: campaingDeleted.campaing_description,
                campaingTypeId: campaingDeleted.campaing_type_id,
                campaingYear: campaingDeleted.campaing_year,
                periodName: campaingDeleted.period_name,
                startDate: campaingDeleted.start_date,
                finishDate: campaingDeleted.finish_date
            }

        } catch (error: any) {
            throw new UnavailableError({message: error.message, core: 'Campaing'})
        }
    }


    async listCampaing (): Promise<Campaing[]> {
        try {
            const campaingList = await prisma.campaing.findMany()

            return campaingList.map(campaing => {
                return {
                    campaingId: campaing.campaing_id,
                    campaingDescription: campaing.campaing_description,
                    campaingTypeId: campaing.campaing_type_id,
                    campaingYear: campaing.campaing_year,
                    periodName: campaing.period_name,
                    startDate: campaing.start_date,
                    finishDate: campaing.finish_date
                }
            })

        } catch (error: any) {
            throw new UnavailableError({message: error.message, core: 'Campaing'})
        }
    }
}