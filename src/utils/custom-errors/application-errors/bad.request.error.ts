import { ResponseCodes } from "../../standar-response/response.codes"

export default class BadRequestError extends Error {
  code: ResponseCodes
  core: string

  constructor ({ message, core }: { message: string, core: string }) {
    super(message)
    this.code = ResponseCodes.BAD_REQUEST
    this.core = core
  }
}