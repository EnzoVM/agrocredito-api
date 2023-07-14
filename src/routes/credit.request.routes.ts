import { Router } from 'express'
import { 
  listCreditRequestHandler
} from '../controllers/credit.request.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const creditRequestRouter = Router()

creditRequestRouter
  .get('/list/:filters', isAuthenticated, listCreditRequestHandler)

export default creditRequestRouter