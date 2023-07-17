import TecniqueList from "../domain/tecnique.list.model";
import TecniquePersistanceRepository from "../domain/tecnique.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";

const prisma = new PrismaConnection().connection

export default class TecniquePrismaRepository implements TecniquePersistanceRepository {

  async listAllTecnique (): Promise<TecniqueList[]> {
    try {
      const tecniqueList = await prisma.tecnique.findMany({
        include: {
          assistance_type: true
        }
      })
      
      return tecniqueList.map(tecnique => {
        return {
          tecniqueId: tecnique.tecnique_id,
          assistanceTypeDescription: tecnique.assistance_type.assistance_type_description,
          tecniqueName: tecnique.tecnique_name
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'tecnique' })
    }
  }

  async listTecniqueByAssistanceType ({assistanceTypeId}:{assistanceTypeId: number}): Promise<TecniqueList[]>{
    try {
      const tecniqueList = await prisma.tecnique.findMany({
        where: {
          assistance_type_id: assistanceTypeId
        },
        include: {
          assistance_type: true
        }
      })

      return tecniqueList.map(tecnique => {
        return {
          tecniqueId: tecnique.tecnique_id,
          assistanceTypeDescription: tecnique.assistance_type.assistance_type_description,
          tecniqueName: tecnique.tecnique_name
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'tecnique' })
    }
  }

}