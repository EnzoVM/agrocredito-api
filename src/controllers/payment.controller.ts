import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import ListPaymentUseCase from "../core/payment/application/list.payment.usecase"
import PaymentPrismaRepository from "../core/payment/infrastructure/payment.prisma.repository"

const paymentPrismaRepository = new PaymentPrismaRepository()
const listPaymentUseCase = new ListPaymentUseCase(paymentPrismaRepository)

export const listPaymentHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { filters } = request.params

  try {
    const {
      campaignId,
      farmerType,
      fullNames,
      socialReason,
      page,
      limit
    } = JSON.parse(filters)

    const paymentsFound = await listPaymentUseCase.list({
      campaignId,
      farmerType,
      fullNames,
      socialReason,
      page,
      limit
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Payments found',
      data: paymentsFound
    }).send(response)
  } catch (error) {
    next(error)
  }
}
