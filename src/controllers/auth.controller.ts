import { NextFunction, Request, Response } from 'express'
import AuthUseCase from '../core/user/application/auth.usecase'
import UserPrismaRepository from '../core/user/infrastructure/user.prisma.repository'
import TokenJWTRepository from '../core/user/infrastructure/token.jwt.repository'
import EncryptBcryptRespository from '../core/user/infrastructure/encrypt.bcrypt.respository'
import ResponseModel from '../utils/response.model'
import { ResponseStatusCodes } from '../utils/response.status.codes'
import { ResponseCodes } from '../utils/response.codes'

const userRepository = new UserPrismaRepository()
const tokenRepository = new TokenJWTRepository()
const encryptRepository = new EncryptBcryptRespository()

const authUseCase = new AuthUseCase(userRepository, tokenRepository, encryptRepository)

export const loginController = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body

  const { accessToken, refreshToken } = await authUseCase.login({ email, password })

  response.cookie('refreshToken', refreshToken)

  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'User was authenticated successfuly',
    data: {
      accessToken,
      refreshToken
    }
  }).send(response)
}

export const getNewAccessToken = async (request: Request, response: Response, next: NextFunction) => {
  const refreshTokenFromCookie = request.cookies.refreshToken
  try {
    const { accessToken, refreshToken } = await authUseCase.generateNewAccessToken({ refreshToken: refreshTokenFromCookie })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Access token generated',
      data: {
        accessToken,
        refreshToken
      }
    }).send(response)
  } catch (error: any) {
    new ResponseModel({
      statusCode: ResponseStatusCodes.UNAUTHORIZED,
      code: ResponseCodes.UNAUTHORIZED,
      message: error.message
    }).send(response)
  }  
}

export const logoutController = async (request: Request, response: Response, next: NextFunction) => {
  response.clearCookie('refreshToken')

  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'User logout successfuly'
  }).send(response)
}