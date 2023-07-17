import { Router } from 'express'
import { listAllAssistanceTypeHandle } from '../controllers/assistance.type.controller'
import isAuthenticated from '../middlewares/isAuthenticated'

const assistanceTypeRouter = Router()

assistanceTypeRouter
  .get('/', isAuthenticated, listAllAssistanceTypeHandle)

export default assistanceTypeRouter