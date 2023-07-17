import TechnicalList from "../domain/technical.list.model"
import TechnicalPersistanceRepository from "../domain/technical.persistance.repository"

export default class ListTechnicalsByAssistanceTypeUseCase {

  constructor(
    private readonly technicalPersistanceRepository: TechnicalPersistanceRepository
  ) {}

  async invoke ({
    assistanceTypeId
  }:{
    assistanceTypeId: number
  }): Promise<TechnicalList[]>{

    const technicalList = await this.technicalPersistanceRepository.listTechnicalsByAssistanceType({assistanceTypeId})
    return technicalList
  }
}