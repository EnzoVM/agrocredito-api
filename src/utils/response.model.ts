import { Response } from 'express'

export default class ResponseModel {
  statusCode: number
  message: string
  data: any

  constructor ({ statusCode, message, data }: { statusCode: number, message: string, data?: any }) {
    this.statusCode = statusCode
    this.message = message
    this.data = typeof data !== 'undefined' ? data : {}
  }

  send (response: Response): void {
    response.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    })
  }
}
