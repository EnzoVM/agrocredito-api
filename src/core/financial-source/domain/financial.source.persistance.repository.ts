import FinancialSourceList from "./financial.source.list.model"

export default interface FinancialSourcePersistanceRepository {
  listFinancialSources: () => Promise<FinancialSourceList[]>
}