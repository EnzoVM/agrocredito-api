import { Response } from 'express'

export default class ResponseModel {
  statusCode: number
  code: string
  message: string
  data: any

  constructor ({ statusCode, code, message, data }: { statusCode: number, code: string, message: string, data?: any }) {
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
