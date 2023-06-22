import TokenRespository from '../domain/token.repository'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET
export default class TokenJWTRepository implements TokenRespository {
  generateToken({ tokenType, payload, expiresIn }: { tokenType: 'access' | 'refresh', payload: any, expiresIn: '1 days' | '7 days' | number }): string {
    const secret = tokenType === 'access' ? ACCESS_TOKEN_SECRET! : REFRESH_TOKEN_SECRET!
    
    const token = jwt.sign(payload, secret, {
      expiresIn
    })

    return token
  }

  decodeToken({ tokenType, token }: { tokenType: 'access' | 'refresh', token: string }): { payload: any, expired: boolean } {
    const secret = tokenType === 'access' ? ACCESS_TOKEN_SECRET! : REFRESH_TOKEN_SECRET!
    
    try {
      const payload = jwt.verify(token, secret)

      return { 
        payload, 
        expired: false 
      } 
    } catch (error: any) {
      console.log('Error aqui', error.message)
      return {
        payload: null,
        expired: true
      }
    }
  }
}