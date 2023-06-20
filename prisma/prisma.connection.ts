import { PrismaClient } from '@prisma/client'

export default class PrismaConnection {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    get connection () {
        return this.prisma
    }

    async disconnect () {
        try {
            await this.prisma.$disconnect()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}