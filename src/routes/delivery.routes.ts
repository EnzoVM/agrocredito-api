import { Router } from 'express'
import { 
  listDeliveriesHandler,
  createDeliveryHandle,
  getDeliveriesByCreditRequestIdHandle
} from '../controllers/delivery.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const deliveryRouter = Router()

deliveryRouter
  .get('/list/:filters', isAuthenticated, listDeliveriesHandler)
  .get('/list/count/:creditRequestId', isAuthenticated, getDeliveriesByCreditRequestIdHandle)
  .post('/', isAuthenticated, createDeliveryHandle)

export default deliveryRouter