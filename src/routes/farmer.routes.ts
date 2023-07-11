import { Router } from 'express'
import { 
  createFarmerHandler, 
  listFarmersHandler, 
  listFarmerAttributesHandler, 
  findFarmerHandler, 
  updateFarmerHandler, 
  deleteFarmerHandler 
} from '../controllers/farmer.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const farmerRouter = Router()

farmerRouter
  .get('/attributes', isAuthenticated, listFarmerAttributesHandler)
  .get('/:farmerId', isAuthenticated, findFarmerHandler)
  .get('/list/:filters', isAuthenticated, listFarmersHandler)
  .post('/', isAuthenticated, createFarmerHandler)
  .put('/:farmerId', isAuthenticated, updateFarmerHandler)
  .delete('/:farmerId', isAuthenticated, deleteFarmerHandler)

export default farmerRouter