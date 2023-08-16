import { NextFunction, Request, Response } from "express"
import CreateSectorUseCase from "../core/sector/application/create.sector.usecase"
import DeleteSectorUseCase from "../core/sector/application/delete.sector.usecase"
import ListSectorUseCase from "../core/sector/application/list.sector.usecase"
import ListAllSectorUseCase from "../core/sector/application/list.all.sector.usecase"
import SectorPrismaRepository from "../core/sector/infrastructure/sector.prisma.repository"
import ProjectPrismaRepository from "../core/project/infrastructure/project.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const createSectorUseCase = new CreateSectorUseCase(new SectorPrismaRepository)
const deleteSectorUseCase = new DeleteSectorUseCase(new SectorPrismaRepository, new ProjectPrismaRepository)
const listSectorUseCase = new ListSectorUseCase(new SectorPrismaRepository)
const listAllSectorUseCase = new ListAllSectorUseCase(new SectorPrismaRepository)

export const createSectorHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { sectorDescription } = req.body
  
  try {
    const sectorAdded = await createSectorUseCase.invoke({
      sectorDescription
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'The sector has been created successfully',
      data: sectorAdded
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const deleteSectorHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { sectorId } = req.params
  
  try {
    const sectorDeletedMessage = await deleteSectorUseCase.invoke({
      sectorId: Number(sectorId)
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'The sector has been deleted successfully',
      data: sectorDeletedMessage
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const listSectorHandler = async (_req: Request, res: Response, next: NextFunction) => {  
  try {
    const sectorList = await listSectorUseCase.invoke()

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'List of sectors',
      data: sectorList
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}

export const listAllSectorHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { filters } = req.params

  try {
    const {
      sectorDescription, 
      page, 
      limit, 
      typeSearch
    } = JSON.parse(filters)
    
    const sectorList = await listAllSectorUseCase.invoke({
      sectorDescription, 
      page, 
      limit, 
      typeSearch
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'List of sectors',
      data: sectorList
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}