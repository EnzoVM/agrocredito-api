import { Router } from 'express'
import { createRequestLogHandler, updateEndRequestTimeHandler } from '../controllers/log.record.controller'

const logRecordRouter = Router()

logRecordRouter
  .post('/', createRequestLogHandler)
  .put('/:recordId', updateEndRequestTimeHandler)

export default logRecordRouter