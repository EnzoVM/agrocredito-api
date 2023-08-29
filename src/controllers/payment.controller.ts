import { NextFunction, Request, Response } from "express"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import ListPaymentUseCase from "../core/payment/application/list.payment.usecase"
import CreatePaymentUseCase from "../core/payment/application/create.payment.usecase"
import PaymentPrismaRepository from "../core/payment/infrastructure/payment.prisma.repository"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"
import CampaignPrismaRepository from "../core/campaign/infraestructure/prisma/campaign.prisma.repository"
import DeliveryPrismaRepository from "../core/delivery/infrastructure/delivery.prisma.repository"

const paymentPrismaRepository = new PaymentPrismaRepository()
const listPaymentUseCase = new ListPaymentUseCase(paymentPrismaRepository)
const createPaymentUseCase = new CreatePaymentUseCase(new PaymentPrismaRepository, new CreditRequestPrimaRepository, new CampaignPrismaRepository, new DeliveryPrismaRepository)

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

export const createPaymentHandle = async (req: Request, res: Response, next: NextFunction) => {
  const {  
    creditRequestId,
    paymentDateTime,
    financialSourceId,
    currentAccountId,
    paymentDescription,
    paymentAmountUSD,
    exchangeRate 
  } = req.body

  try {
    const paymentAdded = await createPaymentUseCase.invoke({
      creditRequestId,
      paymentDateTime,
      financialSourceId,
      currentAccountId,
      paymentDescription,
      paymentAmountUSD,
      exchangeRate 
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Payment has been created successfuly',
      data: paymentAdded
    }).send(res)

  } catch (error) {
    next(error)
  }
}