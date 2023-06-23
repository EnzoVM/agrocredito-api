import { Router } from 'express'
import { loginController, getNewAccessToken } from '../controllers/auth.controller'
import isAuthenticated from '../middlewares/isAuthenticated'
const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.get('/refresh-token', getNewAccessToken)
authRouter.get('/protected-data', isAuthenticated, (request, response) => {
  response.json({
    message: 'User logged'
  })
})

export default authRouter
