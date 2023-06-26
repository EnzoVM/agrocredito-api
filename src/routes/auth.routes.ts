import { Router } from 'express'
import { loginHandler, getNewAccessTokenHandler, loginByAccessTokenHandler } from '../controllers/auth.controller'
const authRouter = Router()

authRouter.post('/login', loginHandler)
authRouter.post('/login-token', loginByAccessTokenHandler)
authRouter.get('/refresh-token', getNewAccessTokenHandler)

export default authRouter
