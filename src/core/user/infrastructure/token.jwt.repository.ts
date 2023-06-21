import TokenRespository from '../domain/token.repository'
import jwt from 'jsonwebtoken'

export default class TokenJWTRepository implements TokenRespository {
  generateToken({ payload, expiresIn }: { payload: any, expiresIn: '1 days' | '7 days' }): string {
    const token = jwt.sign(payload, 'secret', {
      expiresIn
    })

    return token
  }
}