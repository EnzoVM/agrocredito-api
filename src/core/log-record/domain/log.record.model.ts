export default interface LogRecord {
  logRecordId: string
  resource: string
  method: string
  initRequestTime: string
  endRequestTime?: string
}