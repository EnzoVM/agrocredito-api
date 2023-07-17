import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import ListAllTechnicalsUseCase from '../core/technical/application/list.all.technicals.usecase'
import ListTechnicalsByAssistanceTypeUseCase from '../core/technical/application/list.technicals.by.assistance.type.usecase'
import TechnicalPrismaRepository from '../core/technical/infrastructure/technical.prisma.repository'

const listAllTechnicalsUseCase = new ListAllTechnicalsUseCase(new TechnicalPrismaRepository)
const listTechnicalsByAssistanceTypeUseCase = new ListTechnicalsByAssistanceTypeUseCase(new TechnicalPrismaRepository)

export const listAllTechnicalsHandle = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const technicalList = await listAllTechnicalsUseCase.invoke()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of all technicals',
      data: technicalList
    }).send(res)

  } catch (error: any) {
    next(error)
  }
}

export const listTechnicalsByAssistanceTypeHandle = async (req: Request, res: Response, next: NextFunction) => {
  const { assistanceTypeId } = req.params

  try {
    const technicalList = await listTechnicalsByAssistanceTypeUseCase.invoke({assistanceTypeId: Number(assistanceTypeId)})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of technicals by assistance type',
      data: technicalList
    }).send(res)

  } catch (error: any) {
    next(error)
  }
}