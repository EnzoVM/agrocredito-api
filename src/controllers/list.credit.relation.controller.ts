import { NextFunction, Request, Response } from "express"
import ListCreditRelationUseCase from "../core/credit-relation/application/list.credit.relation.usecase"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"
import DeliveryPrismaRepository from "../core/delivery/infrastructure/delivery.prisma.repository"
import CampaignPrismaRepository from "../core/campaign/infraestructure/prisma/campaign.prisma.repository"
import PaymentPrismaRepository from "../core/payment/infrastructure/payment.prisma.repository"

const listCreditRelationUseCase = new ListCreditRelationUseCase(
  new CreditRequestPrimaRepository, 
  new DeliveryPrismaRepository, 
  new CampaignPrismaRepository, 
  new PaymentPrismaRepository
)

export const listCreditRelationHandler = async (request: Request, response: Response, next: NextFunction) => {
  const { filters } = request.params

  try {
    const {
      campaignId,
      farmerType, 
      farmerFullNames, 
      farmerSocialReason,
      page,
      limit
    } = JSON.parse(filters)

    const { creditRelations, count } = await listCreditRelationUseCase.list({
      campaignId,
      farmerType,
      farmerFullNames,
      farmerSocialReason,
      page,
      limit
    })

    new ResponseModel({
      code: ResponseCodes.SUCCESS_REQUEST,
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      message: 'Credit relations found',
      data: {
        creditRelations,
        count
      }
    }).send(response)
  } catch (error) {
    next(error)
  }
}
