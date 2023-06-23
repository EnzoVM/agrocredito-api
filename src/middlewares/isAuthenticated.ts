import { Request, Response, NextFunction } from "express";
import ResponseModel from "../utils/standar-response/response.model";
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes";
import { ResponseCodes } from "../utils/standar-response/response.codes";
import TokenJWTRepository from "../core/user/infrastructure/token.jwt.repository";
import UserPrismaRepository from "../core/user/infrastructure/user.prisma.repository";
import EncryptBcryptRespository from "../core/user/infrastructure/encrypt.bcrypt.respository";
import AuthUseCase from "../core/user/application/auth.usecase";

const userRepository = new UserPrismaRepository()
const tokenRepository = new TokenJWTRepository()
const encryptRepository = new EncryptBcryptRespository()

const authUseCase = new AuthUseCase(userRepository, tokenRepository, encryptRepository)

const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
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
  
    if (!isTokenValid) {
      new ResponseModel({
        statusCode: ResponseStatusCodes.UNAUTHORIZED,
        code: ResponseCodes.UNAUTHORIZED,
        message: 'Token provided has been expired or malformet'
      }).send(response)
    }

    next()
  } catch (error: any) {
    next(error)
  }
}

export default isAuthenticated