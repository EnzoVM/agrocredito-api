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

const farmerPrismaRepository = new FarmerPrismaRepository()
const projectPrismaRepository = new ProjectPrismaRepository()
const createFarmerUseCase = new CreateFarmerUseCase(farmerPrismaRepository, projectPrismaRepository)
const listFarmerUseCase = new ListFarmerUseCase(farmerPrismaRepository)
const listFarmerAttributes = new ListFarmerAttributesUseCase(farmerPrismaRepository)
const findFarmerUseCase = new FindFarmerUseCase(farmerPrismaRepository)
const updateFarmerUseCase = new UpdateFarmerUseCase(farmerPrismaRepository)

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
      message: 'Attributes found',
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
    const attributes = await updateFarmerUseCase.update({ farmerId, farmerAddress, farmerProjectId, hectareQuantity })

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