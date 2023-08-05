import ProviderList from "../domain/provider.list.modal";
import ProviderPersistanceRepository from "../domain/provider.persistance.repository";

export default class ListProviderUseCase {
  
  constructor(
    private readonly providerPersistanceRepository: ProviderPersistanceRepository
  ) {}

  async invoke (): Promise<ProviderList[]> {
    const listProviders = await this.providerPersistanceRepository.listProviders()
    return listProviders
  }
}