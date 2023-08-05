import { Router } from 'express'
import { listFinancialSourceHandle } from '../controllers/financial.source.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const financialSourceRouter = Router()

financialSourceRouter
  .get('/', isAuthenticated, listFinancialSourceHandle)

export default financialSourceRouter