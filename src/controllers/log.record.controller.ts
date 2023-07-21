import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import CreateRecordUseCase from '../core/log-record/application/create.record.usecase'
import LogRecordMongoDBRepository from '../core/log-record/infrastructure/log.record.mongodb.repository'
import UpdateRecordUseCase from '../core/log-record/application/update.record.usecase'

const logRecordMongoDBRepository = new LogRecordMongoDBRepository()
const createRecordUseCase = new CreateRecordUseCase(logRecordMongoDBRepository)
const updateRecordUseCase = new UpdateRecordUseCase(logRecordMongoDBRepository)

export const createRequestLogHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { resource, method, initRequestTime } = request.body

  try {
    const recordId = await createRecordUseCase.create({
      resource,
      method,
      initRequestTime
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Log record created successfuly',
      data: {
        recordId
      }
    }).send(response)
  } catch (error: any) {
    next(error)
  }
}

export const updateEndRequestTimeHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { recordId } = request.params
  const { endRequestTime } = request.body

  try {
    const endRequestTimeDate = new Date(endRequestTime)
    const message = await updateRecordUseCase.update({
      recordId,
      endRequestTime: endRequestTimeDate
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message
    }).send(response)
  } catch (error: any) {
    next(error)
  }
}