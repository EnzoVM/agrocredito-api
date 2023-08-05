import FinancialSourceList from "../domain/financial.source.list.model";
import FinancialSourcePersistanceRepository from "../domain/financial.source.persistance.repository";

export default class ListFinancialSourceUseCase {

  constructor(
    private readonly financialSourcePersistanceRepository: FinancialSourcePersistanceRepository
  ) {}

  async invoke (): Promise<FinancialSourceList[]>{
    const listFinancialSources = await this.financialSourcePersistanceRepository.listFinancialSources()
    return listFinancialSources
  }
}