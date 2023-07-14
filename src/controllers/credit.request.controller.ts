import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import ListCreditRequestUseCase from "../core/credit-request/application/list.credit.request.usecase"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"

const creditRequestPrimaRepository = new CreditRequestPrimaRepository()
const listCreditRequestUseCase = new ListCreditRequestUseCase(creditRequestPrimaRepository)

export const listCreditRequestHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { filters } = request.params

  try {
    const {
      farmerType, 
      creditRequestStatus, 
      farmerFullNames, 
      farmerSocialReason,
      page,
      limit
    } = JSON.parse(filters)

    const { creditRequests, count } = await listCreditRequestUseCase.list({
      farmerType,
      creditRequestStatus,
      farmerFullNames,
      farmerSocialReason,
      page,
      limit
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Credit request found',
      data: {
        creditRequests,
        count
      }
    }).send(response)
  } catch (error) {
    next(error)
  }
}