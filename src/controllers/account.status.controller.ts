import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import GetAccountStatusUseCase from '../core/account-status/application/get.account.status.usecase'
import CreditRequestPrimaRepository from '../core/credit-request/infrastructure/credit.request.prisma.repository'
import DeliveryPrismaRepository from '../core/delivery/infrastructure/delivery.prisma.repository'
import CampaignPrismaRepository from '../core/campaign/infraestructure/prisma/campaign.prisma.repository'
import PaymentPrismaRepository from '../core/payment/infrastructure/payment.prisma.repository'
import LogRecordMongoDBRepository from '../core/log-record/infrastructure/log.record.mongodb.repository'

const getAccountStatusUseCase = new GetAccountStatusUseCase(new CreditRequestPrimaRepository, new DeliveryPrismaRepository, new CampaignPrismaRepository, new PaymentPrismaRepository, new LogRecordMongoDBRepository)

export const getAccountStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { creditRequestId, take } = req.params

  try {
    const accountStatus = await getAccountStatusUseCase.get({ creditRequestId, take: take ? Number(take) : undefined })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Account status got successful',
      data: accountStatus
    }).send(res)

  } catch (error: any) {
    next(error)
  }
}