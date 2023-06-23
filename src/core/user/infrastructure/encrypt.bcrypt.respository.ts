import EncryptRespository from '../domain/encrypt.repository'
import bcrypt from 'bcrypt'

export default class EncryptBcryptRespository implements EncryptRespository {
  async decryptPassword({ passwordDecripted, encryptedPassword }: { passwordDecripted: string, encryptedPassword: string }): Promise<boolean> {
    const isTheSamePassword = await bcrypt.compare(passwordDecripted, encryptedPassword)
    return isTheSamePassword
  }
  async encryptPassword({ password }: { password: string }): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
  }
}