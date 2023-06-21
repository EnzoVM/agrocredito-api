export default class UnauthorizateError extends Error {
  code: string
  core: string

  constructor ({ code, message, core }: { code?: string, message: string, core: string }) {
    super(message)
    this.code = code ?? 'UNAUTHORIZATE_ERROR'
    this.core = core
  }
}