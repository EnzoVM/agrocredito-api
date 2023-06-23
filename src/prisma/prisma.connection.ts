import { PrismaClient } from '@prisma/client'
import ConnectionError from '../utils/custom-errors/infrastructure-errors/unavailable.error'

export default class PrismaConnection {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  get connection (): PrismaClient {
    return this.prisma
  }

  async disconnect (): Promise<void> {
    try {
      await this.prisma.$disconnect()
    } catch (error: any) {
      throw new ConnectionError({ message: error.message, core: 'any' })
    }
  }
}
