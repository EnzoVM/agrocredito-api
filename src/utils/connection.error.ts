export default class ConnectionError extends Error {
  code: string
  core: string

  constructor ({ code, message, core }: { code?: string, message: string, core: string }) {
    super(message)
    this.code = code ?? 'CONNECTION_ERROR'
    this.core = core
  }
}