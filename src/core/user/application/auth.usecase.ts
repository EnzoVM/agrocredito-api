import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error";
import UnauthorizateError from "../../../utils/custom-errors/application-errors/unauthorizate.error";
import EncryptRespository from "../domain/encrypt.repository";
import TokenRespository from "../domain/token.repository";
import UserRespository from "../domain/user.repository";

export default class AuthUseCase {
  constructor (
    private readonly userRepository: UserRespository,
    private readonly tokenRepository: TokenRespository,
    private readonly encryptRepository: EncryptRespository
  ) {}

  async login ({ email, password }: { email: string, password: string }): Promise<{ refreshToken: string, accessToken: string }> {
    
    const userFound = await this.userRepository.findUserByEmail(email)

    if (!userFound) {
      throw new NotFoundError({ core: 'user', message: 'Email or password are invalid' })
    }

    const isTheSamePassword = await this.encryptRepository.decryptPassword({ passwordDecripted: password, encryptedPassword: userFound.password })

    if (!isTheSamePassword) {
      throw new UnauthorizateError({ core: 'user', message: 'Email or password are invalid' })
    }

    const accessToken = this.tokenRepository.generateToken({ tokenType: 'access', payload: { email: userFound.email }, expiresIn: '1 days' })
    const refreshToken = this.tokenRepository.generateToken({ tokenType: 'refresh', payload: { email: userFound.email }, expiresIn: '7 days' })

    return {
      accessToken,
      refreshToken
    }
  }

  async validateAccessToken ({ accessToken }: { accessToken: string }): Promise<boolean> {
    const { payload, expired } = this.tokenRepository.decodeToken({ tokenType: 'access', token: accessToken })

    if (expired) {
      throw new UnauthorizateError({ core: 'user', message: 'Token expired' })
    }
 
    const userFound = await this.userRepository.findUserByEmail(payload.email)

    if (!userFound || expired) {
      return false
    }

    return true
  }

  async generateNewAccessToken ({ refreshToken }: { refreshToken: string }): Promise<{ refreshToken: string, accessToken: string }> {
    const { payload, expired } = this.tokenRepository.decodeToken({ tokenType: 'refresh', token: refreshToken })

    if (expired) {
      throw new UnauthorizateError({ core: 'user', message: 'You must to login again' })
    }

    const { email } = payload

    const userFound = await this.userRepository.findUserByEmail(email)

    if (!userFound) {
      throw new NotFoundError({ core: 'user', message: 'Email or password are invalid' })
    }

    const accessToken = this.tokenRepository.generateToken({ tokenType: 'access', payload: { email: userFound.email }, expiresIn: '1 days' })

    return {
      accessToken,
      refreshToken
    }
  }
}