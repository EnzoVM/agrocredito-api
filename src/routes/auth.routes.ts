import { Router } from 'express'
import { loginController, getNewAccessToken, loginByAccessToken } from '../controllers/auth.controller'
import isAuthenticated from '../middlewares/isAuthenticated'
const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.post('/login-token', loginByAccessToken)
authRouter.get('/refresh-token', getNewAccessToken)
authRouter.get('/protected-data', isAuthenticated, (request, response) => {
  response.json({
    message: 'User logged'
  })
})

export default authRouter
