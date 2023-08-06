import { Router } from 'express'
import { listCurrentAccountHandle } from '../controllers/current.account.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const currentAccountRouter = Router()

currentAccountRouter
  .get('/', isAuthenticated, listCurrentAccountHandle)

export default currentAccountRouter