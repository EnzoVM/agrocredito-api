import UserPrismaRepository from "../../../../src/core/user/infrastructure/user.prisma.repository"
import TokenJWTRepository from "../../../../src/core/user/infrastructure/token.jwt.repository"
import EncryptBcryptRespository from "../../../../src/core/user/infrastructure/encrypt.bcrypt.respository"
import AuthUseCase from "../../../../src/core/user/application/auth.usecase"
import User from "../../../../src/core/user/domain/user.model"
import NotFoundError from "../../../../src/utils/custom-errors/application-errors/not.found.error"
import UnauthorizateError from "../../../../src/utils/custom-errors/application-errors/unauthorizate.error"

jest.mock("../../../../src/core/user/infrastructure/user.prisma.repository")
jest.mock("../../../../src/core/user/infrastructure/token.jwt.repository")
jest.mock("../../../../src/core/user/infrastructure/encrypt.bcrypt.respository")

describe('User module test suites', () => {

  const mockUser: User = {
    email: 'test@test.com',
    password: '12345'
  }
  const mockAccessToken = '2j8282098290292'
  const mockDecodedToken = {
    expired: false,
    payload: {
      email: 'test@test.com'
    }
  }

  let userRespository: UserPrismaRepository
  let tokenJWTRepository: TokenJWTRepository
  let encryptBcryptRespository: EncryptBcryptRespository
  let authUseCase: AuthUseCase

  beforeAll(() => {
    userRespository = new UserPrismaRepository()
    tokenJWTRepository = new TokenJWTRepository()
    encryptBcryptRespository = new EncryptBcryptRespository()    
  })

  beforeEach(() => {
    jest.spyOn(userRespository, 'findUserByEmail').mockResolvedValue(mockUser)
    jest.spyOn(tokenJWTRepository, 'generateToken').mockReturnValue(mockAccessToken)
    jest.spyOn(tokenJWTRepository, 'decodeToken').mockReturnValue(mockDecodedToken)
    jest.spyOn(encryptBcryptRespository, 'decryptPassword').mockResolvedValue(true)

    authUseCase = new AuthUseCase(userRespository, tokenJWTRepository, encryptBcryptRespository)
  })

  describe('OPERATION_SUCCESS', () => {
    test('Return access and refresh token', async () => {
      const { accessToken, refreshToken } = await authUseCase.login({ email: mockUser.email, password: mockUser.password })

      expect(accessToken).toBe(accessToken)
      expect(refreshToken).toBe(refreshToken)
    })

    test('Return true when access token is valid', async () => {
      const isTheSamePassword = await authUseCase.validateAccessToken({ accessToken: 'hj983h382h390oe' })

      expect(isTheSamePassword).toBe(true)
    })

    test('Return false when access token is invalid', async () => {
      jest.spyOn(userRespository, 'findUserByEmail').mockResolvedValue(null)
      const isTheSamePassword = await authUseCase.validateAccessToken({ accessToken: 'hj983h382h390oe' })

      expect(isTheSamePassword).toBe(false)
    })

    test('Return new access and the same refresh token as before', async () => {
      const { accessToken, refreshToken } = await authUseCase.generateNewAccessToken({ refreshToken: mockAccessToken })

      expect(accessToken).toBe(accessToken)
      expect(refreshToken).toBe(refreshToken)
    })
  })

  describe('NOT_FOUND', () => {
    test('Should throw a NOT_FOUND error when user repository returns null object', async () => {
      jest.spyOn(userRespository, 'findUserByEmail').mockResolvedValue(null)
      
      try {
        await authUseCase.login({ email: mockUser.email, password: mockUser.password })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })

    test('Return new access and the same refresh token as before', async () => {
      jest.spyOn(userRespository, 'findUserByEmail').mockResolvedValue(null)

      try {
        await authUseCase.generateNewAccessToken({ refreshToken: mockAccessToken })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  describe('UNAUTHORIZED_ERROR', () => {
    test('Should throw a UNAUTHORIZED_ERROR error when passwords are not the same', async () => {
      jest.spyOn(encryptBcryptRespository, 'decryptPassword').mockResolvedValue(false)
      
      try {
        await authUseCase.login({ email: mockUser.email, password: mockUser.password })
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizateError)
      }
    })

    test('Return true when access token is valid', async () => {
      jest.spyOn(tokenJWTRepository, 'decodeToken').mockReturnValue({
        expired: true,
        payload: null
      })
      
      try {
        await authUseCase.validateAccessToken({ accessToken: 'hj983h382h390oe' })
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizateError)       
      }
    })

    test('Return true when access token is valid', async () => {
      jest.spyOn(tokenJWTRepository, 'decodeToken').mockReturnValue({
        expired: true,
        payload: null
      })
      
      try {
        await authUseCase.generateNewAccessToken({ refreshToken: mockAccessToken })
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizateError)       
      }
    })
  })
})