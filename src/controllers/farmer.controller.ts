import { NextFunction, Request, Response, response } from "express"
import CreateFarmerUseCase from "../core/farmer/application/create.farmer.usecase"
import FarmerPrismaRepository from "../core/farmer/infrastructure/farmer.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { FarmerCreate } from "../core/farmer/domain/farmer.create.model"
import ListFarmerAttributes from "../core/farmer/application/list.farmer.attributes"

const farmerPrismaRepository = new FarmerPrismaRepository()
const createFarmerUseCase = new CreateFarmerUseCase(farmerPrismaRepository)
const listFarmerAttributes = new ListFarmerAttributes(farmerPrismaRepository)

export const createFarmerHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { 
    propertySectorId,
    propertyProjectId,
    farmerQualityId,
    farmerType,
    socialReason,
    fullNames,
    dni,
    ruc,
    propertyLocation,
    propertyLegalConditionId,
    cadastralRegistry,
    farmerAddress,
    farmerProjectId,
    propertyHectareQuantity
  } = request.body

  const farmer: FarmerCreate = { 
    propertySectorId,
    propertyProjectId,
    farmerQualityId,
    farmerType,
    socialReason,
    fullNames,
    dni,
    ruc,
    propertyLocation,
    propertyLegalConditionId,
    cadastralRegistry,
    farmerAddress,
    farmerProjectId,
    propertyHectareQuantity
  }

  try {
    const message = await createFarmerUseCase.create(farmer)

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const listFarmerAttributesHandler = async (_request: Request, _response: Response, next: NextFunction) => {
  try {
    const attributes = await listFarmerAttributes.list()

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Attributes found',
      data: attributes
    }).send(response)
  } catch (error) {
    next(error)
  }
}