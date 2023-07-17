import TecniqueList from "../domain/tecnique.list.model";
import TecniquePersistanceRepository from "../domain/tecnique.persistance.repository";

export default class ListAllTecniquesUseCase {

  constructor(
    private readonly tecniquePersistanceRepository: TecniquePersistanceRepository
  ) {}

  async invoke (): Promise<TecniqueList[]> {

    const tecniqueList = await this.tecniquePersistanceRepository.listAllTecnique()
    return tecniqueList
  }
}