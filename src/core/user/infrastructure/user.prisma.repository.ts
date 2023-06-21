import PrismaConnection from "../../../prisma/prisma.connection";
import User from "../domain/user.model";
import UserRespository from "../domain/user.repository";

const prismaConnection = new PrismaConnection()
const prisma = prismaConnection.connection


export default class UserPrismaRepository implements UserRespository {
  async findUserByEmail(email: string): Promise<User | null> {
    const userFound = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return userFound
  }
}