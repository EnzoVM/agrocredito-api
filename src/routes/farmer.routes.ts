import { Router } from 'express'
import { createFarmerHandler, listFarmersHandler, listFarmerAttributesHandler, findFarmerHandler, updateFarmerHandler } from '../controllers/farmer.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const farmerRouter = Router()

farmerRouter
  .get('/:farmerId', isAuthenticated, findFarmerHandler)
  .get('/attributes', isAuthenticated, listFarmerAttributesHandler)
  .get('/list/:filters', isAuthenticated, listFarmersHandler)
  .post('/', isAuthenticated, createFarmerHandler)
  .put('/:farmerId', isAuthenticated, updateFarmerHandler)

export default farmerRouter