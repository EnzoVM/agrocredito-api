import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import ResponseModel from './utils/response.model'
import { ResponseCodes } from './utils/response.codes'
import { ResponseStatusCodes } from './utils/response.status.codes'

dotenv.config()
const app = express()

app.use(express.json())
app.use(morgan(process.env.ENV === 'dev' ? 'dev' : 'common'))

app.set('PORT', process.env.PORT)

app.get('/', (_request: Request, response: Response) => {
  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'Hello world'
  }).send(response)
})

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})
