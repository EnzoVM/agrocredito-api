import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import ResponseModel from './utils/response.model'
import { ResponseCodes } from './utils/response.codes'
import { ResponseStatusCodes } from './utils/response.status.codes'
import LogRecord from './core/logrecord/infrastructure/model/log.record.model'
import './core/logrecord/infrastructure/mongodb.connection'

dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.set('PORT', process.env.PORT ?? 3000)

const controller = async (_request: Request, response: Response): Promise<void> => {
  const newLogRecord = new LogRecord({
    resource: 'exampleResource',
    method: 'GET',
    initRequestTime: '2023-06-20T10:00:00'
  })

  try {
    const recordSaved = await newLogRecord.save()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Hello world works',
      data: recordSaved
    }).send(response)
  } catch (error) {
    new ResponseModel({
      statusCode: ResponseStatusCodes.UNCONTROLLER_ERROR,
      code: ResponseCodes.UNCONTROLLER_ERROR,
      message: 'Hello world not working'
    }).send(response)
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', controller)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})
