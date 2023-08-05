import { Router } from 'express'
import { listProviderHandle } from '../controllers/provider.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const providerRouter = Router()

providerRouter
  .get('/', isAuthenticated, listProviderHandle)

export default providerRouter