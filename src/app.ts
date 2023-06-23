import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import ResponseModel from './utils/standar-response/response.model'
import { ResponseCodes } from './utils/standar-response/response.codes'
import { ResponseStatusCodes } from './utils/standar-response/response.status.codes'
import authRouter from './routes/auth.routes'
import notFound from './middlewares/notFound'
import responseError from './middlewares/responseError'

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

app.use(notFound)
app.use(responseError)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})
