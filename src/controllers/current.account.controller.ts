import { NextFunction, Request, Response } from "express"
import ListCurrentAccountUseCase from "../core/current-account/application/list.current.account.usecase"
import CurrentAccountPrismaRepository from "../core/current-account/infrastructure/current.account.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"

const listCurrentAccountUseCase = new ListCurrentAccountUseCase(new CurrentAccountPrismaRepository)

export const listCurrentAccountHandle = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const listCurrentAccounts = await listCurrentAccountUseCase.invoke()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of all current accounts',
      data: listCurrentAccounts
    }).send(res)
    
  } catch (error: any) {
    next(error)
  }
}