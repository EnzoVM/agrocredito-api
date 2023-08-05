import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";
import FinancialSourceList from "../domain/financial.source.list.model";
import FinancialSourcePersistanceRepository from "../domain/financial.source.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"

const prisma = new PrismaConnection().connection

export default class FinancialSourcePrismaRepository implements FinancialSourcePersistanceRepository {
  
  async listFinancialSources (): Promise<FinancialSourceList[]> {
    try {
      const listFinancialSources = await prisma.financial_source.findMany()

      return listFinancialSources.map(financial => {
        return {
          financialSourceId: financial.financial_source_id,
          financialSourceDescription: financial.financial_source_description
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Financial-Source'})
    }
  }

}