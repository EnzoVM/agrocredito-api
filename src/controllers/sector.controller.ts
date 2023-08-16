import { NextFunction, Request, Response } from "express"
import CreateSectorUseCase from "../core/sector/application/create.sector.usecase"
import SectorPrismaRepository from "../core/sector/infrastructure/sector.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const createSectorUseCase = new CreateSectorUseCase(new SectorPrismaRepository)

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