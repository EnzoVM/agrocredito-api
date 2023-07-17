import { NextFunction, Request, Response } from 'express'
import ListAllAssistanceTypeUseCase from '../core/assistance-type/application/list.all.assistance.type.usecase'
import AssistanceTypePrismaRepository from '../core/assistance-type/infrastructure/assistance.type.prisma.repository'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'

const listAllAssistanceTypeUseCase = new ListAllAssistanceTypeUseCase(new AssistanceTypePrismaRepository)

export const listAllAssistanceTypeHandle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assistanceTypeList = await listAllAssistanceTypeUseCase.invoke()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The delivery plan model has been created successfully',
      data: assistanceTypeList
    }).send(res)

  } catch (error: any) {
    next(error)
  }
}