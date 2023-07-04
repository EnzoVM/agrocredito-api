import { Router } from 'express'
import { createDepartureDetailHandle, deleteDepartureDetailHandle, listDepartureDetailHandle } from '../controllers/departure.detail.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const departureDetailRouter = Router()

departureDetailRouter
  .post('/', isAuthenticated, createDepartureDetailHandle)
  .delete('/:departureDetailId', isAuthenticated, deleteDepartureDetailHandle)
  .get('/list/:deliveryPlanModelId', isAuthenticated, listDepartureDetailHandle)

export default departureDetailRouter