import { Router } from 'express'
import { 
  getAllProjectsHandler, 
  getProjectsBySectorIdHandler,
  deleteProjectByIdHandle,
  listAllProjectsHandle
} from '../controllers/project.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const projectRouter = Router()

projectRouter
  .get('/', isAuthenticated, getAllProjectsHandler)
  .get('/:sectorId', isAuthenticated, getProjectsBySectorIdHandler)
  .get('/list/:filters', isAuthenticated, listAllProjectsHandle)
  .delete('/delete/:projectId', isAuthenticated, deleteProjectByIdHandle)
  
export default projectRouter