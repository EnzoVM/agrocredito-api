import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";
import TechnicalList from "../domain/technical.list.model";
import TechnicalPersistanceRepository from "../domain/technical.persistance.repository";

const prisma = new PrismaConnection().connection

export default class TechnicalPrismaRepository implements TechnicalPersistanceRepository {

  async listAllTechnicals (): Promise<TechnicalList[]> {
    try {
      const technicalList = await prisma.technical.findMany({
        include: {
          assistance_type: true
        }
      })
      
      return technicalList.map(technical => {
        return {
          technicalId: technical.technical_id,
          assistanceTypeDescription: technical.assistance_type.assistance_type_description,
          technicalName: technical.technical_name
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Technical'})
    }
  }

  async listTechnicalsByAssistanceType ({
    assistanceTypeId
  }:{
    assistanceTypeId: number
  }): Promise<TechnicalList[]>{
    try {
      const technicalList = await prisma.technical.findMany({
        where: {
          assistance_type_id: assistanceTypeId
        },
        include: {
          assistance_type: true
        }
      })

      return technicalList.map(technical => {
        return {
          technicalId: technical.technical_id,
          assistanceTypeDescription: technical.assistance_type.assistance_type_description,
          technicalName: technical.technical_name
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Technical'})
    }
  }
}