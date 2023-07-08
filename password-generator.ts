import EncryptBcryptRespository from './src/core/user/infrastructure/encrypt.bcrypt.respository'

const encryptBcryptRespository = new EncryptBcryptRespository()

const main = async () => {
  const passwordEncypted = await encryptBcryptRespository.encryptPassword({ password: 'admin' })
  console.log(passwordEncypted)
}

main()