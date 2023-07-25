import { Request, Response, NextFunction } from "express"
import CreateDepartureDetailUseCase from "../core/departure-detail/application/create.departure.detail.usecase"
import DeleteDepartureDetailUseCase from "../core/departure-detail/application/delete.departure.detail.usecase"
import ListDepartureDetailUseCase from "../core/departure-detail/application/list.departure.detail.usecase"
import ListDepartureDetailByCampaignId from "../core/departure-detail/application/list.departure.detail.by.campaign.id.usecase"
import DepartureDetailPrismaRepository from "../core/departure-detail/infrastructure/departure.detail.prisma.repository"
import DeliveryPlanModelPrismaRepository from "../core/delivery-plan-model/infrastructure/delivery.plan.model.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { validate } from "class-validator"
import DepartureDetailDTO from "../dto/departure.detail.dto"
import BadRequestError from "../utils/custom-errors/application-errors/bad.request.error"

const createDepartureDetailUseCase = new CreateDepartureDetailUseCase(new DepartureDetailPrismaRepository, new DeliveryPlanModelPrismaRepository)
const deleteDepartureDetailUseCase = new DeleteDepartureDetailUseCase(new DepartureDetailPrismaRepository)
const listDepartureDetailUseCase = new ListDepartureDetailUseCase(new DepartureDetailPrismaRepository)
const listDepartureDetailByCampaignId = new ListDepartureDetailByCampaignId(new DepartureDetailPrismaRepository)

export const createDepartureDetailHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {deliveryPlanModelId, departureDetailDescription, departureType, amountPerHectare} = req.body

  try {
    const errorDataDepartureDetail = await validate(new DepartureDetailDTO({
      deliveryPlanModelId,
      departureDetailDescription,
      departureType,
      amountPerHectare
    }))

    if(errorDataDepartureDetail.length > 0) {
      const errorMessages = errorDataDepartureDetail.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
      throw new BadRequestError({ message: errorMessages.join(', '), core: 'Departure Detail'})
    }
    
    const departureDetailCreated = await createDepartureDetailUseCase.invoke({
      deliveryPlanModelId,
      departureDetailDescription,
      departureType,
      amountPerHectare
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The departure detail has been created successfully',
      data: departureDetailCreated
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const deleteDepartureDetailHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {departureDetailId} = req.params

  try {
    const departureDetailDeleted = await deleteDepartureDetailUseCase.invoke({departureDetailId: Number(departureDetailId)})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The departure detail has been deleted successfully',
      data: departureDetailDeleted
    }).send(res)

  } catch (error) {
    next(error)
  }
}

export const listDepartureDetailHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {deliveryPlanModelId} = req.params

  try {
    const departureDetailList = await listDepartureDetailUseCase.invoke({deliveryPlanModelId: Number(deliveryPlanModelId)})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The departure details has been found successfully',
      data: departureDetailList
    }).send(res)

  } catch (error) {
    next(error)
  }
}

export const listDepartureDetailByCampaignIdHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {campaignId} = req.params
  
  try {
    const departureDetailList = await listDepartureDetailByCampaignId.invoke({campaignId})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of departure details by campaign id',
      data: departureDetailList
    }).send(res)

  } catch (error) {
    next(error)
  }
}