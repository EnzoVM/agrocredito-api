import { NextFunction, Request, Response } from 'express'
import AuthUseCase from '../core/user/application/auth.usecase'
import UserPrismaRepository from '../core/user/infrastructure/user.prisma.repository'
import TokenJWTRepository from '../core/user/infrastructure/token.jwt.repository'
import EncryptBcryptRespository from '../core/user/infrastructure/encrypt.bcrypt.respository'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'

const userRepository = new UserPrismaRepository()
const tokenRepository = new TokenJWTRepository()
const encryptRepository = new EncryptBcryptRespository()

const authUseCase = new AuthUseCase(userRepository, tokenRepository, encryptRepository)

export const loginHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body

  try {
    const { accessToken, refreshToken } = await authUseCase.login({ email, password })

    response.cookie('accessToken', accessToken)
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
  } catch (error) {
    next(error)
  }
}

export const loginByAccessTokenHandler = async (request: Request, response: Response, next: NextFunction) => {
  const accessTokenFromCookie = request.cookies.accessToken

  try {
    const isTokenValid = await authUseCase.validateAccessToken({ accessToken: accessTokenFromCookie })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Token was authenticated successfuly',
      data: {
        isTokenValid
      }
    }).send(response)
  } catch (error) {
    next(error)
  }
}

export const getNewAccessTokenHandler = async (request: Request, response: Response, next: NextFunction) => {
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
    next(error)
  }  
}