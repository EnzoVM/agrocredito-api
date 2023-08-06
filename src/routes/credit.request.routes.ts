import { Router } from 'express'
import { 
  listCreditRequestHandler,
  createCreditRequestHandler,
  GetCreditRequestHandler,
  UpdateCreditRequestStatusHandler,
  listApprovedCreditRequestByFarmerHandle
} from '../controllers/credit.request.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const creditRequestRouter = Router()

creditRequestRouter
  .get('/list/:filters', isAuthenticated, listCreditRequestHandler)
  .get('/:creditRequestId', isAuthenticated, GetCreditRequestHandler)
  .post('/', isAuthenticated, createCreditRequestHandler)
  .put('/:creditRequestId', isAuthenticated, UpdateCreditRequestStatusHandler)
  .get('/list/approved/:farmerId', isAuthenticated, listApprovedCreditRequestByFarmerHandle)

export default creditRequestRouter