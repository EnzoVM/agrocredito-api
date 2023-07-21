export default interface LogRecordPersistanceRepository {
  createNewRecord ({ resource, method, initRequestTime }: { resource: string, method: string, initRequestTime: Date }): Promise<string>
  setEndRequestTimeRecordById ({ recordId, endRequestTime }: { recordId: string, endRequestTime: Date }): Promise<string>
}