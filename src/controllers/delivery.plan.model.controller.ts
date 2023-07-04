import { Request, Response, NextFunction } from "express";
import CreateDeliveryPlanModel from "../core/delivery-plan-model/application/create.delivery.plan.model"
import DeleteDeliveryPlanModel from "../core/delivery-plan-model/application/delete.delivery.plan.model"
import GetDeliveryPlanModel from "../core/delivery-plan-model/application/get.delivery.plan.model"
import DeliveryPlanModelPrismaRepository from "../core/delivery-plan-model/infrastructure/delivery.plan.model.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model";
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes";
import { ResponseCodes } from "../utils/standar-response/response.codes";

const createDeliveryPlanModel = new CreateDeliveryPlanModel(new DeliveryPlanModelPrismaRepository)
const deleteDeliveryPlanModel = new DeleteDeliveryPlanModel(new DeliveryPlanModelPrismaRepository)
const getDeliveryPlanModel = new GetDeliveryPlanModel(new DeliveryPlanModelPrismaRepository)

export const createDeliveryPlanModelHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {campaignId, deliveryPlanModelDescription} = req.body

  try {
    const deliveryPlanModelCreated = await createDeliveryPlanModel.invoke({
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
    const deliveryPlanModelDeleted = await deleteDeliveryPlanModel.invoke({deliveryPlanModelId: Number(deliveryPlanModelId)})

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
    const deliveryPlanModelFound = await getDeliveryPlanModel.invoke({campaignId})

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