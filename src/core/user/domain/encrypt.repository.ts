export default interface EncryptRespository {
  encryptPassword({ password }: { password: string }): Promise<string>
  decryptPassword({ passwordDecripted, encryptedPassword }: { passwordDecripted: string, encryptedPassword: string }): Promise<boolean>
}