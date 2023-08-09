import { NextFunction, Request, Response } from "express"
import ListProjectUseCase from "../core/project/application/list.project.usecase"
import ProjectPrismaRepository from "../core/project/infrastructure/project.prisma.repository"
import DeleteProjectByIdUseCase from "../core/project/application/delete.project.by.id.usecase"
import ListAllProjectsUseCase from "../core/project/application/list.all.projects.usecase"
import FarmerPrismaRepository from "../core/farmer/infrastructure/farmer.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const projectPrismaRepository = new ProjectPrismaRepository()
const listProjectUseCase = new ListProjectUseCase(projectPrismaRepository)
const deleteProjectByIdUseCase = new DeleteProjectByIdUseCase(new ProjectPrismaRepository, new FarmerPrismaRepository)
const listAllProjectsUseCase = new ListAllProjectsUseCase(new ProjectPrismaRepository)

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

export const deleteProjectByIdHandle = async (req: Request, res: Response, next: NextFunction) => {
  const { projectId } = req.params
  
  try {
    const projectDelete = await deleteProjectByIdUseCase.invoke({projectId: Number(projectId)})
    
    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'The project has been deleted successfully',
      data: projectDelete
    }).send(res)

  } catch (error) {
    next(error)
  }
}

export const listAllProjectsHandle = async (req: Request, res: Response, next: NextFunction) => {
  const { filters } = req.params

  try {
    const {
      sectorId, 
      projectDescription, 
      page, 
      limit, 
      typeSearch
    } = JSON.parse(filters)

    const projectList = await listAllProjectsUseCase.invoke({
     sectorId,
     projectDescription,
     page,
     limit,
     typeSearch 
    })
    
    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'List of projects by sector',
      data: projectList
    }).send(res)

  } catch (error) {
    next(error)
  }
}