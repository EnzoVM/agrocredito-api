import { Router } from 'express'
import { listDeliveriesHandler } from '../controllers/delivery.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const deliveryRouter = Router()

deliveryRouter
  .get('/list/:filters', isAuthenticated, listDeliveriesHandler)

export default deliveryRouter