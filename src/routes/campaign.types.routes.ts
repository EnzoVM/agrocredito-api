import { Router } from 'express'
import { listCampaignTypesHandler } from '../controllers/campaign.type.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const campaignTypeRouter = Router()

campaignTypeRouter
  .get('/', isAuthenticated, listCampaignTypesHandler)


export default campaignTypeRouter