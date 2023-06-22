import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import ResponseModel from './utils/response.model'
import { ResponseCodes } from './utils/response.codes'
import { ResponseStatusCodes } from './utils/response.status.codes'
import authRouter from './routes/auth.routes'

dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.set('PORT', process.env.PORT ?? 3000)

const home = async (_request: Request, response: Response): Promise<void> => {
  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'Welcome to AgroCredito API v1.'
  }).send(response)
}

app.get('/', home)

app.use('/api/v1/auth', authRouter)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})
