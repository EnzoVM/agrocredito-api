import { Router } from 'express'
import { 
  listPaymentHandler,
  createPaymentHandle
} from '../controllers/payment.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const paymentRouter = Router()

paymentRouter
  .get('/list/:filters', isAuthenticated, listPaymentHandler)
  .post('/', isAuthenticated, createPaymentHandle)
  
export default paymentRouter