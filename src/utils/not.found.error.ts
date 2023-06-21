export default class NotFoundError extends Error {
  code: string
  core: string

  constructor ({ code, message, core }: { code?: string, message: string, core: string }) {
    super(message)
    this.code = code ?? 'NOT_FOUND_ERROR'
    this.core = core
  }
}