import { Router } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'
import { 
  createDepartureDetailHandle, 
  deleteDepartureDetailHandle, 
  listDepartureDetailHandle, 
  listDepartureDetailByCampaignIdHandle 
} from '../controllers/departure.detail.controller'

const departureDetailRouter = Router()

departureDetailRouter
  .post('/', isAuthenticated, createDepartureDetailHandle)
  .delete('/:departureDetailId', isAuthenticated, deleteDepartureDetailHandle)
  .get('/list/:deliveryPlanModelId', isAuthenticated, listDepartureDetailHandle)
  .get('/list/bycampaing/:campaignId', isAuthenticated, listDepartureDetailByCampaignIdHandle)
  
export default departureDetailRouter