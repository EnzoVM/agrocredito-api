import { Router } from 'express'
import { 
  createSectorHandler,
  deleteSectorHandler
} from '../controllers/sector.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const sectorRouter = Router()

sectorRouter
  .post('/', isAuthenticated, createSectorHandler)
  .delete('/:sectorId', isAuthenticated, deleteSectorHandler)

export default sectorRouter