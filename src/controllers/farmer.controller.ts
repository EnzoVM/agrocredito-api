import { NextFunction, Request, Response, response } from "express"
import CreateFarmerUseCase from "../core/farmer/application/create.farmer.usecase"
import FarmerPrismaRepository from "../core/farmer/infrastructure/farmer.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { FarmerCreate } from "../core/farmer/domain/farmer.create.model"
import ListFarmerAttributesUseCase from "../core/farmer/application/list.farmer.attributes.usecase"
import ProjectPrismaRepository from "../core/project/infrastructure/project.prisma.repository"
import ListFarmerUseCase from "../core/farmer/application/list.farmer.usecase"
import FindFarmerUseCase from "../core/farmer/application/find.farmer.usecase"
import UpdateFarmerUseCase from "../core/farmer/application/update.farmer.usecase"
import { validate } from "class-validator"
import FarmerCreateDTO from "../dto/farmer.create.dto"
import BadRequestError from "../utils/custom-errors/application-errors/bad.request.error"
import FarmerUpdateDTO from "../dto/farmer.update.dto"
import DeleteFarmerUseCase from "../core/farmer/application/delete.farmer.usecase"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"

const farmerPrismaRepository = new FarmerPrismaRepository()
const projectPrismaRepository = new ProjectPrismaRepository()
const creditRequestPrismaRepository = new CreditRequestPrimaRepository()
const createFarmerUseCase = new CreateFarmerUseCase(farmerPrismaRepository, projectPrismaRepository)
const listFarmerUseCase = new ListFarmerUseCase(farmerPrismaRepository)
const listFarmerAttributes = new ListFarmerAttributesUseCase(farmerPrismaRepository)
const findFarmerUseCase = new FindFarmerUseCase(farmerPrismaRepository)
const updateFarmerUseCase = new UpdateFarmerUseCase(farmerPrismaRepository)
const deleteFarmerUseCase = new DeleteFarmerUseCase(farmerPrismaRepository, creditRequestPrismaRepository)

export const createFarmerHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { 
    propertySectorId,
    propertyProjectCode,
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
    propertyProjectCode,
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
    const errorDataFarmerCreate = await validate(new FarmerCreateDTO({
      propertySectorId,
      propertyProjectCode,
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
    }))

    if(errorDataFarmerCreate.length > 0) {
      const errorMessages = errorDataFarmerCreate.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
      throw new BadRequestError({ message: errorMessages.join(', '), core: 'Delivery Plan Model'})
    }

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

export const listFarmersHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { filters } = request.params

  try {
    const {
      searchType,
      farmerId,
      farmerFullNames,
      farmerSocialReason,
      farmerType,
      page,
      limit
    } = JSON.parse(filters)

    const { farmers, count } = await listFarmerUseCase.list({
      searchType,
      farmerId,
      farmerType,
      farmerFullNames,
      farmerSocialReason,
      page,
      limit
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Farmers list got successfuly',
      data: {
        farmers,
        count
      }
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const listFarmerAttributesHandler = async (_request: Request, response: Response, next: NextFunction) => {
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

export const findFarmerHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { farmerId } = request.params
  
  try {
    const attributes = await findFarmerUseCase.get({ farmerId })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Farmer found',
      data: attributes
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const updateFarmerHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { farmerId } = request.params
  const { farmerAddress, farmerProjectId, hectareQuantity } = request.body
  
  try {

    const errorDataFarmerUpdate = await validate(new FarmerUpdateDTO({
      farmerId,
      farmerAddress,
      farmerProjectId,
      hectareQuantity
    }))

    if(errorDataFarmerUpdate.length > 0) {
      const errorMessages = errorDataFarmerUpdate.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
      throw new BadRequestError({ message: errorMessages.join(', '), core: 'Delivery Plan Model'})
    }

    const attributes = await updateFarmerUseCase.update({ farmerId, farmerAddress, farmerProjectId, hectareQuantity })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Farmer updated',
      data: attributes
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const deleteFarmerHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { farmerId } = request.params
  
  try {
    const message = await deleteFarmerUseCase.delete({ farmerId })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message
    }).send(response)
  } catch (error) {
    next(error)
  }
}