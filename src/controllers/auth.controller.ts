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
  const authorization = request.headers.authorization

  try {
    if (!authorization) {
      new ResponseModel({
        statusCode: ResponseStatusCodes.UNAUTHORIZED,
        code: ResponseCodes.UNAUTHORIZED,
        message: 'You must to specify a token'
      }).send(response)
    }
  
    if(authorization?.split(' ')[0].toLowerCase() !== 'bearer') {
      new ResponseModel({
        statusCode: ResponseStatusCodes.UNAUTHORIZED,
        code: ResponseCodes.UNAUTHORIZED,
        message: 'Token provided is malformet'
      }).send(response)
    }
  
    const accessToken = authorization!.split(' ')[1]
    const isTokenValid = await authUseCase.validateAccessToken({ accessToken })

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
  const authorization = request.headers.authorization

  try {
    if (!authorization) {
      new ResponseModel({
        statusCode: ResponseStatusCodes.UNAUTHORIZED,
        code: ResponseCodes.UNAUTHORIZED,
        message: 'You must to specify a token'
      }).send(response)
    }
  
    if(authorization?.split(' ')[0].toLowerCase() !== 'bearer') {
      new ResponseModel({
        statusCode: ResponseStatusCodes.UNAUTHORIZED,
        code: ResponseCodes.UNAUTHORIZED,
        message: 'Token provided is malformet'
      }).send(response)
    }
  
    const refreshToken = authorization!.split(' ')[1]
    const { accessToken: newAccessToken, refreshToken: newRefeshToken } = await authUseCase.generateNewAccessToken({ refreshToken })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Access token generated',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefeshToken
      }
    }).send(response)
  } catch (error: any) {
    next(error)
  }  
}