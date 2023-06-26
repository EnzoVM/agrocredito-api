import { Router } from 'express'
import { listPeriodHandler } from '../controllers/campaign.type.controller'

const campaignTypeRouter = Router()

campaignTypeRouter
  .get('/:campaignTypeId', listPeriodHandler)


export default campaignTypeRouter