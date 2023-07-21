import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import LogRecordPersistanceRepository from "../domain/log.record.persistance.repository"
import LogRecord from "./model/log.record.model"

export default class LogRecordMongoDBRepository implements LogRecordPersistanceRepository {
  async createNewRecord({ resource, method, initRequestTime }: { resource: string, method: string, initRequestTime: Date }): Promise<string> {
    try {
      console.log({
        resource,
        method,
        initRequestTime
      })
      const newLogRecord = new LogRecord({
        resource,
        method,
        initRequestTime
      })
  
      const { _id } = await newLogRecord.save()
  
      return _id.toString()
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'log-record' })
    }
  }

  async setEndRequestTimeRecordById({ recordId, endRequestTime }: { recordId: string, endRequestTime: Date }): Promise<string> {
    try {
      await LogRecord.findByIdAndUpdate({ _id: recordId }, {
        endRequestTime
      })
  
      return `End request time in request log with id ${recordId} has been updated`
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'log-record' })
    }
  }
}