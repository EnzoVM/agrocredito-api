import { Router } from 'express'
import { createFarmerHandler, listFarmerAttributesHandler } from '../controllers/farmer.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const farmerRouter = Router()

farmerRouter
  .get('/attributes', isAuthenticated, listFarmerAttributesHandler)
  .post('/', isAuthenticated, createFarmerHandler)

export default farmerRouter