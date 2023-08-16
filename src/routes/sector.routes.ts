import { Router } from 'express'
import { createSectorHandler } from '../controllers/sector.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const sectorRouter = Router()

sectorRouter
  .post('/', isAuthenticated, createSectorHandler)

export default sectorRouter