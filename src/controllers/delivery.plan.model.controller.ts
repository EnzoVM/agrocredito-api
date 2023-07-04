import { Request, Response, NextFunction } from "express"
import CreateDeliveryPlanModelUseCase from "../core/delivery-plan-model/application/create.delivery.plan.model.usecase"
import DeleteDeliveryPlanModelUseCase from "../core/delivery-plan-model/application/delete.delivery.plan.model.usecase"
import GetDeliveryPlanModelUseCase from "../core/delivery-plan-model/application/get.delivery.plan.model.usecase"
import DeliveryPlanModelPrismaRepository from "../core/delivery-plan-model/infrastructure/delivery.plan.model.prisma.repository"
import CampaignPrismaRepository from "../core/campaign/infraestructure/prisma/campaign.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { validate } from "class-validator"
import DeliveryPlanModelDTO from "../dto/delivery.plan.model.dto"
import BadRequestError from "../utils/custom-errors/application-errors/bad.request.error"

const createDeliveryPlanModelUseCase = new CreateDeliveryPlanModelUseCase(new DeliveryPlanModelPrismaRepository, new CampaignPrismaRepository)
const deleteDeliveryPlanModelUseCase = new DeleteDeliveryPlanModelUseCase(new DeliveryPlanModelPrismaRepository)
const getDeliveryPlanModelUseCase = new GetDeliveryPlanModelUseCase(new DeliveryPlanModelPrismaRepository)

export const createDeliveryPlanModelHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {campaignId, deliveryPlanModelDescription} = req.body

  try {
    const errorDataDeliveryPlanModel = await validate(new DeliveryPlanModelDTO({
      campaignId,
      deliveryPlanModelDescription
    }))

    if(errorDataDeliveryPlanModel.length > 0) {
      const errorMessages = errorDataDeliveryPlanModel.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
      throw new BadRequestError({ message: errorMessages.join(', '), core: 'Delivery Plan Model'})
    }

    const deliveryPlanModelCreated = await createDeliveryPlanModelUseCase.invoke({
      campaignId,
      deliveryPlanModelDescription
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The delivery plan model has been created successfully',
      data: deliveryPlanModelCreated
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const deleteDeliveryPlanModelHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {deliveryPlanModelId} = req.params

  try {
    const deliveryPlanModelDeleted = await deleteDeliveryPlanModelUseCase.invoke({deliveryPlanModelId: Number(deliveryPlanModelId)})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The delivery plan model has been deleted successfully',
      data: deliveryPlanModelDeleted
    }).send(res)

  } catch (error) {
    next(error)
  }
}

export const getDeliveryPlanModelHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {campaignId} = req.params

  try {
    const deliveryPlanModelFound = await getDeliveryPlanModelUseCase.invoke({campaignId})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The delivery plan model has been found successfully',
      data: deliveryPlanModelFound
    }).send(res)

  } catch (error) {
    next(error)
  }
}