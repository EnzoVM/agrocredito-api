import PrismaConnection from "../../../prisma/prisma.connection";
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";
import User from "../domain/user.model";
import UserRespository from "../domain/user.repository";

const prismaConnection = new PrismaConnection()
const prisma = prismaConnection.connection

export default class UserPrismaRepository implements UserRespository {
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          email
        }
      })
  
      return userFound
    } catch (error) {
      throw new UnavailableError({ core: 'user', message: 'User service is unavailable' }) 
    }
    
  }
}