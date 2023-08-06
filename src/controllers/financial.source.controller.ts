import { NextFunction, Request, Response } from "express"
import ListFinancialSourceUseCase from "../core/financial-source/application/list.financial.source.usecase"
import FinancialSourcePrismaRepository from "../core/financial-source/infrastructure/financial.source.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"

const listFinancialSourceUseCase = new ListFinancialSourceUseCase(new FinancialSourcePrismaRepository)

export const listFinancialSourceHandle = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const listFinancialSources = await listFinancialSourceUseCase.invoke()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of all financial sources',
      data: listFinancialSources
    }).send(res)
    
  } catch (error: any) {
    next(error)
  }
}

