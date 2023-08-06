import { NextFunction, Request, Response } from "express"
import ListProviderUseCase from "../core/provider/application/list.provider.usecase"
import ProviderPrismaRepository from "../core/provider/infrastructure/provider.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"

const listProviderUseCase = new ListProviderUseCase(new ProviderPrismaRepository)

export const listProviderHandle = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const listProviders = await listProviderUseCase.invoke() 

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of all providers',
      data: listProviders
    }).send(res)
    
  } catch (error: any) {
    next(error)
  }
}