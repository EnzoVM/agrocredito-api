import { Request, Response, NextFunction } from "express";
import CreateDepartureDetail from "../core/departure-detail/application/create.departure.detail"
import DeleteDepartureDetail from "../core/departure-detail/application/delete.departure.detail"
import ListDepartureDetail from "../core/departure-detail/application/list.departure.detail"
import DepartureDetailPrismaRepository from "../core/departure-detail/infrastructure/departure.detail.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model";
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes";
import { ResponseCodes } from "../utils/standar-response/response.codes";

const createDepartureDetail = new CreateDepartureDetail(new DepartureDetailPrismaRepository)
const deleteDepartureDetail = new DeleteDepartureDetail(new DepartureDetailPrismaRepository)
const listDepartureDetail = new ListDepartureDetail(new DepartureDetailPrismaRepository)

export const createDepartureDetailHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {deliveryPlanModelId, departureDetailDescription, departureType, amountPerHectare} = req.body

  try {
    const departureDetailCreated = await createDepartureDetail.invoke({
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
    const departureDetailDeleted = await deleteDepartureDetail.invoke({departureDetailId: Number(departureDetailId)})

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
    const departureDetailList = await listDepartureDetail.invoke({deliveryPlanModelId: Number(deliveryPlanModelId)})

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