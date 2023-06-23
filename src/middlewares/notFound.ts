import { Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'

const notFound = (_request: Request, response: Response) => {
  new ResponseModel({
    statusCode: ResponseStatusCodes.NOT_FOUND,
    code: ResponseCodes.NOT_FOUND,
    message: 'Resource not found'
  }).send(response)
}

export default notFound