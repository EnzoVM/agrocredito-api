import { Router } from 'express'
import { 
  listPaymentHandler
} from '../controllers/payment.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const paymentRouter = Router()

paymentRouter
  .get('/list/:filters', isAuthenticated, listPaymentHandler)

export default paymentRouter