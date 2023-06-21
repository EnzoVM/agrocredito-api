export default interface TokenRespository {
  generateToken({ payload, expiresIn }: { payload: any, expiresIn: '1 days' | '7 days' }): string
}