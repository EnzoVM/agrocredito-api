import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import GetAccountStatusUseCase from '../core/account-status/application/get.account.status.usecase'
import CreditRequestPrimaRepository from '../core/credit-request/infrastructure/credit.request.prisma.repository'
import DeliveryPrismaRepository from '../core/delivery/infrastructure/delivery.prisma.repository'
import CampaignPrismaRepository from '../core/campaign/infraestructure/prisma/campaign.prisma.repository'
import PaymentPrismaRepository from '../core/payment/infrastructure/payment.prisma.repository'

const getAccountStatusUseCase = new GetAccountStatusUseCase(new CreditRequestPrimaRepository, new DeliveryPrismaRepository, new CampaignPrismaRepository, new PaymentPrismaRepository)

export const getAccountStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { creditRequestId } = req.params
  const { take } = req.body

  try {
    const accountStatus = await getAccountStatusUseCase.get({ creditRequestId, take })

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