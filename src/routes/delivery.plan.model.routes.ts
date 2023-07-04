import { Router } from 'express'
import { createDeliveryPlanModelHandle, deleteDeliveryPlanModelHandle, getDeliveryPlanModelHandle } from '../controllers/delivery.plan.model.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const deliveryPlanModelRouter = Router()

deliveryPlanModelRouter
  .post('/', isAuthenticated, createDeliveryPlanModelHandle)
  .delete('/:deliveryPlanModelId', isAuthenticated, deleteDeliveryPlanModelHandle)
  .get('/list/:campaignId', isAuthenticated, getDeliveryPlanModelHandle)

export default deliveryPlanModelRouter