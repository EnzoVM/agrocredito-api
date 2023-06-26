import { Request, Response, NextFunction } from 'express'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import UnauthorizateError from '../utils/custom-errors/application-errors/unauthorizate.error'
import NotFoundError from '../utils/custom-errors/application-errors/not.found.error'
import UnavailableError from '../utils/custom-errors/infrastructure-errors/unavailable.error'
import BadRequestError from '../utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../utils/custom-errors/application-errors/process.error'

interface ErrorHandler {
  [key: string]: (error: Error, request: Request, response: Response) => void;
}

const HANDLER_ERROR: ErrorHandler = {
  BAD_REQUEST: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.BAD_REQUEST, statusCode: ResponseStatusCodes.BAD_REQUEST, message: error.message }).send(response),
  NOT_FOUND: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.NOT_FOUND, statusCode: ResponseStatusCodes.NOT_FOUND, message: error.message }).send(response),
  PROCESS_ERROR: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.PROCESS_ERROR, statusCode: ResponseStatusCodes.PROCESS_ERROR, message: error.message }).send(response),
  UNAUTHORIZED_ERROR: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.UNAUTHORIZED, statusCode: ResponseStatusCodes.UNAUTHORIZED, message: error.message }).send(response),
  UNAVAILABLE_SERVICE: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.UNAVAILABLE_SERVICE, statusCode: ResponseStatusCodes.UNAVAILABLE_SERVICE, message: error.message }).send(response),
  UNCONTROLLER_ERROR: (error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.UNCONTROLLER_ERROR, statusCode: ResponseStatusCodes.UNCONTROLLER_ERROR, message: error.message }).send(response),
  'default': (_error: Error, _request: Request, response: Response) => new ResponseModel({ code: ResponseCodes.UNCONTROLLER_ERROR, statusCode: ResponseStatusCodes.UNCONTROLLER_ERROR, message: 'Uncontroller error' }).send(response)
}

const responseError = (error: NotFoundError | UnauthorizateError | UnavailableError | BadRequestError | ProcessError, request: Request, response: Response, _next: NextFunction) => {
  const responseError = HANDLER_ERROR[error.code || 'default']
  console.log(error)
  responseError(error, request, response)
}

export default responseError