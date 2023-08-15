import ProviderList from "./provider.list.modal"

export default interface ProviderPersistanceRepository {
  listProviders: () => Promise<ProviderList[]>
}