import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import ListCreditRequestUseCase from "../core/credit-request/application/list.credit.request.usecase"
import CreateCreditRequestUseCase from "../core/credit-request/application/create.credit.request.usecase"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"
import CreditRequestUuidRepository from "../core/credit-request/infrastructure/credit.request.uuid.repository"
import DepartureDetailPrismaRepository from "../core/departure-detail/infrastructure/departure.detail.prisma.repository"
import FarmerPrismaRepository from "../core/farmer/infrastructure/farmer.prisma.repository"

const creditRequestPrimaRepository = new CreditRequestPrimaRepository()
const listCreditRequestUseCase = new ListCreditRequestUseCase(creditRequestPrimaRepository)
const createCreditRequestUseCase = new CreateCreditRequestUseCase(
  new CreditRequestPrimaRepository, 
  new CreditRequestUuidRepository, 
  new DepartureDetailPrismaRepository, 
  new FarmerPrismaRepository)

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

export const createCreditRequestHandle = async (req: Request, res: Response, next: NextFunction) => {
  const { 
    farmerId,
    campaignId,
    hectareNumber,
    creditReason,
    creditAmount,
    guaranteeDescription,
    guaranteeAmount,
    technicalId,
    creditRequestObservation
  } = req.body

  try {
    const creditRequestCreated = await createCreditRequestUseCase.invoke({
      farmerId,
      campaignId,
      hectareNumber,
      creditReason,
      creditAmount,
      guaranteeDescription,
      guaranteeAmount,
      technicalId,
      creditRequestObservation
    })
    
    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Credit request has been created successfully',
      data: creditRequestCreated
    }).send(res)

  } catch (error) {
    next(error)
  }
}