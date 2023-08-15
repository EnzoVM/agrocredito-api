import { Router } from 'express'
import { 
  listCreditRelationHandler
} from '../controllers/list.credit.relation.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const creditRelationRouter = Router()

creditRelationRouter
  .get('/list/:filters', isAuthenticated, listCreditRelationHandler)

export default creditRelationRouter