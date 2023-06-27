import { Router } from 'express'
import { listPeriodHandler } from '../controllers/campaign.type.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const campaignTypeRouter = Router()

campaignTypeRouter
  .get('/:campaignTypeId', isAuthenticated, listPeriodHandler)


export default campaignTypeRouter