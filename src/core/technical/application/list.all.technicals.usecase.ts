import TechnicalList from "../domain/technical.list.model"
import TechnicalPersistanceRepository from "../domain/technical.persistance.repository"

export default class ListAllTechnicalsUseCase {

  constructor(
    private readonly technicalPersistanceRepository: TechnicalPersistanceRepository
  ) {}

  async invoke (): Promise<TechnicalList[]> {

    const technicalList = await this.technicalPersistanceRepository.listAllTechnicals()
    return technicalList
  }
}