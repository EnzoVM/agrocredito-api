import { Router } from 'express'
import { 
  listCreditRequestHandler,
  createCreditRequestHandle
} from '../controllers/credit.request.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const creditRequestRouter = Router()

creditRequestRouter
  .get('/list/:filters', isAuthenticated, listCreditRequestHandler)
  .post('/', isAuthenticated, createCreditRequestHandle)

export default creditRequestRouter