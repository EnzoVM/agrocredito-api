import { Router } from 'express'
import { createCampaignHandler, deleteCampaignHandler, listCampaignHandler } from '../controllers/campaign.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const campaignRouter = Router()

campaignRouter
  .post('/', isAuthenticated, createCampaignHandler)
  .delete('/:campaignId', isAuthenticated, deleteCampaignHandler)
  .get('/list/:json', isAuthenticated, listCampaignHandler)

export default campaignRouter