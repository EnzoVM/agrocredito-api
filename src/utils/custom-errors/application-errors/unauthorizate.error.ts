import { ResponseCodes } from "../../standar-response/response.codes"

export default class UnauthorizateError extends Error {
  code: ResponseCodes
  core: string

  constructor ({ message, core }: { message: string, core: string }) {
    super(message)
    this.code = ResponseCodes.UNAUTHORIZED
    this.core = core
  }
}