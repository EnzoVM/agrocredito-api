import NotFoundError from "../../../utils/not.found.error";
import UnauthorizateError from "../../../utils/unauthorizate.error";
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

    const refreshToken = this.tokenRepository.generateToken({ payload: { email: userFound.email }, expiresIn: '1 days' })
    const accessToken = this.tokenRepository.generateToken({ payload: { refreshToken }, expiresIn: '7 days' })

    return {
      accessToken,
      refreshToken
    }
  }
}