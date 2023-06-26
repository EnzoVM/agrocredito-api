import { Router } from 'express'
import { createCampaignHandler, deleteCampaignHandler, listCampaignHandler } from '../controllers/campaign.controller'

const campaignRouter = Router()

campaignRouter
  .post('/', createCampaignHandler)
  .delete('/:campaignId', deleteCampaignHandler)
  .get('/:json', listCampaignHandler)

export default campaignRouter