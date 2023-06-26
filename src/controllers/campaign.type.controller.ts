import { Request, Response, NextFunction } from "express"
import ListPeriodByCampaignType from "../core/campaing-type/application/list.period.by.campaign.type"
import CampaignTypePrismaRepository from "../core/campaing-type/infrastructure/campaign.type.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const listPeriodByCampaignType = new ListPeriodByCampaignType(new CampaignTypePrismaRepository)

export const listPeriodHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { campaignTypeId } = req.params

  try {
    const periodList = await listPeriodByCampaignType.list({
      campaignTypeId: Number(campaignTypeId)
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of periods by campaign type',
      data: periodList
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}