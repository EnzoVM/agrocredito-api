import { Router } from 'express'
import { listAllTechnicalsHandle, listTechnicalsByAssistanceTypeHandle } from '../controllers/technical.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const technicalRouter = Router()

technicalRouter
  .get('/', isAuthenticated, listAllTechnicalsHandle)
  .get('/:assistanceTypeId', isAuthenticated, listTechnicalsByAssistanceTypeHandle)

export default technicalRouter