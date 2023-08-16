import { Router } from 'express'
import { 
  createSectorHandler,
  deleteSectorHandler,
  listSectorHandler,
  listAllSectorHandler
} from '../controllers/sector.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const sectorRouter = Router()

sectorRouter
  .post('/', isAuthenticated, createSectorHandler)
  .delete('/:sectorId', isAuthenticated, deleteSectorHandler)
  .get('/', isAuthenticated, listSectorHandler)
  .get('/list/:filters', isAuthenticated, listAllSectorHandler)
  
export default sectorRouter