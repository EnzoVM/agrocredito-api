import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import DeliveryPrismaRepository from "../core/delivery/infrastructure/delivery.prisma.repository"
import ListDeliveryUseCase from "../core/delivery/application/list.delivery.usecase"
import CreateDeliveryUseCase from "../core/delivery/application/create.delivery.usecase"
import CountDeliveriesByCreditRequestIdUseCase from "../core/delivery/application/count.deliveries.by.credit.request.id.usecase"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"

const deliveryPrismaRepository = new DeliveryPrismaRepository()
const listDeliveryUseCase = new ListDeliveryUseCase(deliveryPrismaRepository)
const createDeliveryUseCase = new CreateDeliveryUseCase(new DeliveryPrismaRepository, new CreditRequestPrimaRepository)
const countDeliveriesByCreditRequestIdUseCase = new CountDeliveriesByCreditRequestIdUseCase(new DeliveryPrismaRepository)

export const listDeliveriesHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { filters } = request.params

  try {
    const {
      campaignId,
      farmerType,
      fullNames,
      socialReason,
      page,
      limit
    } = JSON.parse(filters)

    const deliveriesFound = await listDeliveryUseCase.list({
      campaignId,
      farmerType,
      fullNames,
      socialReason,
      page,
      limit
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Deliveries found',
      data: deliveriesFound
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const createDeliveryHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {
    creditRequestId,
    deliveryDatetime,
    providerId,
    financialSourceId,
    currentAccountId,
    gloss,
    exchangeRate
  } = req.body

  try {
    const deliveryAdded = await createDeliveryUseCase.invoke({
      creditRequestId,
      deliveryDatetime,
      providerId,
      financialSourceId,
      currentAccountId,
      gloss,
      exchangeRate
    })
    
    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Delivery has been created successfuly',
      data: deliveryAdded
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const getDeliveriesByCreditRequestIdHandle = async (req: Request, res: Response, next: NextFunction) => {
  const { creditRequestId } = req.params
  
  try {
    const deliveriesCount = await countDeliveriesByCreditRequestIdUseCase.invoke({creditRequestId})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Number of deliveries associated with a credit request',
      data: deliveriesCount
    }).send(res)
  
  } catch (error) {
    next(error)
  }
}
