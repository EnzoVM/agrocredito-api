import { Router } from 'express'
import { 
  listDeliveriesHandler,
  createDeliveryHandle
} from '../controllers/delivery.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const deliveryRouter = Router()

deliveryRouter
  .get('/list/:filters', isAuthenticated, listDeliveriesHandler)
  .post('/', isAuthenticated, createDeliveryHandle)

export default deliveryRouter