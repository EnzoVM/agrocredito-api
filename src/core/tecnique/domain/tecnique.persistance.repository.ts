import TecniqueList from "./tecnique.list.model";

export default interface TecniquePersistanceRepository {
  
  listAllTecnique: () => Promise<TecniqueList[]>
  listTecniqueByAssistanceType: ({assistanceTypeId}:{assistanceTypeId: number}) => Promise<TecniqueList[]>

}