export default interface LogRecord {
  resource: string
  method: string
  initRequestTime: string
  endRequestTime?: string
}