import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import DeliveryPrismaRepository from "../core/delivery/infrastructure/delivery.prisma.repository"
import ListDeliveryUseCase from "../core/delivery/application/list.delivery.usecase"

const deliveryPrismaRepository = new DeliveryPrismaRepository()
const listDeliveryUseCase = new ListDeliveryUseCase(deliveryPrismaRepository)

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
