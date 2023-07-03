import { Router } from 'express'
import { getAllProjectsHandler, getProjectsBySectorIdHandler } from '../controllers/project.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const projectRouter = Router()

projectRouter
  .get('/', isAuthenticated, getAllProjectsHandler)
  .get('/:sectorId', isAuthenticated, getProjectsBySectorIdHandler)

export default projectRouter