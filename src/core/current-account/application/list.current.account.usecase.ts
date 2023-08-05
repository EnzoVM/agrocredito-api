import CurrentAccountList from "../domain/current.account.list.model";
import CurrentAccountPersistanceRepository from "../domain/current.account.persistance.repository";

export default class ListCurrentAccountUseCase {
  
  constructor(
    private readonly currentAccountPersistanceRepository: CurrentAccountPersistanceRepository
  ) {}

  async invoke (): Promise<CurrentAccountList[]> {
    const listCurrentAccount = await this.currentAccountPersistanceRepository.listCurrentAcount()
    return listCurrentAccount
  }
}