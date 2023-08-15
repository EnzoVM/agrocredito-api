import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import CurrentAccountList from "../domain/current.account.list.model"
import CurrentAccountPersistanceRepository from "../domain/current.account.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"

const prisma = new PrismaConnection().connection

export default class CurrentAccountPrismaRepository implements CurrentAccountPersistanceRepository{
  
  async listCurrentAcount (): Promise<CurrentAccountList[]> {
    try {
      const currentAccountList = await prisma.current_account.findMany()

      return currentAccountList.map(account => {
        return {
          currentAccountId: account.current_account_id,
          currentAccountDescription: account.current_account_description
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Current-Account' })
    }
  }
}