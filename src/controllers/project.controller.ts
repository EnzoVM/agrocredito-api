import { NextFunction, Request, Response } from "express"
import ListProjectUseCase from "../core/project/application/list.project.usecase"
import ProjectPrismaRepository from "../core/project/infrastructure/project.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const projectPrismaRepository = new ProjectPrismaRepository()
const listProjectUseCase = new ListProjectUseCase(projectPrismaRepository)

export const getAllProjectsHandler = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const projects = await listProjectUseCase.listAll()

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Projects found',
      data: projects
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const getProjectsBySectorIdHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { sectorId } = request.params

  try {
    const projects = await listProjectUseCase.listBySector({ sectorId: Number(sectorId) })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Projects found',
      data: projects
    }).send(response)
  } catch (error) {
    next(error)
  }
}