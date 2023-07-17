import TechnicalList from "./technical.list.model"

export default interface TechnicalPersistanceRepository {
  
  listAllTechnicals: () => Promise<TechnicalList[]>
  listTechnicalsByAssistanceType: ({assistanceTypeId}:{assistanceTypeId: number}) => Promise<TechnicalList[]>

}