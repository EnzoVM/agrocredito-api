import { Router } from 'express'
import { createFarmerHandler, listFarmersHandler, listFarmerAttributesHandler } from '../controllers/farmer.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const farmerRouter = Router()

farmerRouter
  .get('/attributes', isAuthenticated, listFarmerAttributesHandler)
  .get('/list/:filters', isAuthenticated, listFarmersHandler)
  .post('/', isAuthenticated, createFarmerHandler)

export default farmerRouter