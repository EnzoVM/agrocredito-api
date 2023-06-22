export default interface TokenRespository {
  generateToken({ tokenType, payload, expiresIn }: { tokenType: 'access' | 'refresh', payload: any, expiresIn: '1 days' | '7 days' | number }): string
  decodeToken({ tokenType, token }: { tokenType: 'access' | 'refresh', token: string }): { payload: any, expired: boolean }
}