import AssistanceTypeListModel from "../domain/assistance.type.list.model";
import AssistanceTypePersistanceRepository from "../domain/assistance.type.persistance.repository";

export default class ListAllAssistanceTypeUseCase {

  constructor(
    private readonly assistanceTypePersistanceRepository: AssistanceTypePersistanceRepository
  ) {}

  async invoke (): Promise<AssistanceTypeListModel[]> {
    const assistanceTypeList = await this.assistanceTypePersistanceRepository.listAllAssistanceType()
    return assistanceTypeList
  }
}