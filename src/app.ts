import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ResponseModel from './utils/standar-response/response.model'
import { ResponseCodes } from './utils/standar-response/response.codes'
import { ResponseStatusCodes } from './utils/standar-response/response.status.codes'
import notFound from './middlewares/notFound'
import responseError from './middlewares/responseError'
import authRouter from './routes/auth.routes'
import campaignRouter from './routes/campaign.routes'
import campaignTypeRouter from './routes/campaign.types.routes'
import deliveryPlanModelRouter from './routes/delivery.plan.model.routes'
import departureDetailRouter from './routes/departure.detail.routes'
import farmerRouter from './routes/farmer.routes'
import projectRouter from './routes/project.routes'
import creditRequestRouter from './routes/credit.request.routes'

dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

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
app.use('/api/v1/campaign', campaignRouter)
app.use('/api/v1/campaign-type', campaignTypeRouter)
app.use('/api/v1/delivery-plan-model', deliveryPlanModelRouter)
app.use('/api/v1/departure-detail', departureDetailRouter)
app.use('/api/v1/farmers', farmerRouter)
app.use('/api/v1/projects', projectRouter)
app.use('/api/v1/credit-requests', creditRequestRouter)

app.use(notFound)
app.use(responseError)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})
