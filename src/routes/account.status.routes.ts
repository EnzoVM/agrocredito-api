import { Router } from 'express'
import { getAccountStatusHandler } from '../controllers/account.status.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const accountStatusRouter = Router()

accountStatusRouter
  .get('/:creditRequestId', isAuthenticated, getAccountStatusHandler)

export default accountStatusRouter