import { Router } from 'express'
import { 
  listCreditRequestHandler,
  createCreditRequestHandler,
  GetCreditRequestHandler,
  UpdateCreditRequestStatusHandler
} from '../controllers/credit.request.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const creditRequestRouter = Router()

creditRequestRouter
  .get('/list/:filters', isAuthenticated, listCreditRequestHandler)
  .get('/:creditRequestId', isAuthenticated, GetCreditRequestHandler)
  .post('/', isAuthenticated, createCreditRequestHandler)
  .put('/:creditRequestId', isAuthenticated, UpdateCreditRequestStatusHandler)

export default creditRequestRouter