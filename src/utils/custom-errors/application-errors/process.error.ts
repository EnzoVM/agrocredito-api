import { ResponseCodes } from "../../standar-response/response.codes"

export default class ProcessError extends Error {
  code: ResponseCodes
  core: string

  constructor ({ message, core }: { message: string, core: string }) {
    super(message)
    this.code = ResponseCodes.PROCESS_ERROR
    this.core = core
  }
}