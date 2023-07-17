import TecniqueList from "../domain/tecnique.list.model";
import TecniquePersistanceRepository from "../domain/tecnique.persistance.repository";

export default class ListTecniquesByAssistanceType {

  constructor(
    private readonly tecniquePersistanceRepository: TecniquePersistanceRepository
  ) {}

  async invoke ({
    assistanceTypeId
  }:{
    assistanceTypeId: number
  }): Promise<TecniqueList[]>{

    const tecniqueList = await this.tecniquePersistanceRepository.listTecniqueByAssistanceType({assistanceTypeId})
    return tecniqueList
  }
}