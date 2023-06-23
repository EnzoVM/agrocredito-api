import { type Response } from 'express'
import { ResponseStatusCodes } from './response.status.codes'
import { ResponseCodes } from './response.codes'

export default class ResponseModel {
  statusCode: ResponseStatusCodes
  code: ResponseCodes
  message: string
  data: any

  constructor ({ statusCode, code, message, data }: { statusCode: ResponseStatusCodes, code: ResponseCodes, message: string, data?: any }) {
    this.statusCode = statusCode
    this.code = code
    this.message = message
    this.data = typeof data !== 'undefined' ? data : {}
  }

  send (response: Response): void {
    response.status(this.statusCode).json({
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      data: this.data
    })
  }
}
