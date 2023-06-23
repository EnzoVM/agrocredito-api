import { ResponseCodes } from "../../standar-response/response.codes"

export default class NotFoundError extends Error {
  code: ResponseCodes
  core: string

  constructor ({ message, core }: { message: string, core: string }) {
    super(message)
    this.code = ResponseCodes.NOT_FOUND
    this.core = core
  }
}