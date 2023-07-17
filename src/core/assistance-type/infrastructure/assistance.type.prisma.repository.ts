import AssistanceTypeListModel from "../domain/assistance.type.list.model";
import AssistanceTypePersistanceRepository from "../domain/assistance.type.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";

const prisma = new PrismaConnection().connection

export default class AssistanceTypePrismaRepository implements AssistanceTypePersistanceRepository {
  
  async listAllAssistanceType (): Promise<AssistanceTypeListModel[]>{
    try {
      const assistanceTypeList = await prisma.assistance_type.findMany()
      
      return assistanceTypeList.map(assistance => {
        return {
          assistanceTypeId: assistance.assistance_type_id,
          assistanceTypeDescription: assistance.assistance_type_description
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'assistance type'})
    }
  }
}