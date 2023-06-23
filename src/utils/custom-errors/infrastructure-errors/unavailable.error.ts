import { ResponseCodes } from "../../standar-response/response.codes"

export default class UnavailableError extends Error {
  code: ResponseCodes
  core: string

  constructor ({ message, core }: { message: string, core: string }) {
    super(message)
    this.code = ResponseCodes.UNAVAILABLE_SERVICE
    this.core = core
  }
}