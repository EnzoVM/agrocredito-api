import AssistanceTypeListModel from "./assistance.type.list.model";

export default interface AssistanceTypePersistanceRepository {
  listAllAssistanceType: () => Promise<AssistanceTypeListModel[]>
}