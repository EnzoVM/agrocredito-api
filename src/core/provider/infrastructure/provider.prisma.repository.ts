import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import ProviderList from "../domain/provider.list.modal"
import ProviderPersistanceRepository from "../domain/provider.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"

const prisma = new PrismaConnection().connection

export default class ProviderPrismaRepository implements ProviderPersistanceRepository {
  
  async listProviders (): Promise<ProviderList[]> {
    try {
      const listProviders = await prisma.provider.findMany()

      return listProviders.map(provider => {
        return {
          providerId: provider.provider_id,
          providerDescription: provider.provider_description
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Provider'})
    }
  }

}