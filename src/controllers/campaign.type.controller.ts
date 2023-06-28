import { Request, Response, NextFunction } from "express"
import ListCampaignTypes from "../core/campaing-type/application/list.campaign.types"
import CampaignTypePrismaRepository from "../core/campaing-type/infrastructure/campaign.type.prisma.repository"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseCodes } from "../utils/standar-response/response.codes"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"

const listCampaignTypes = new ListCampaignTypes(new CampaignTypePrismaRepository)

export const listCampaignTypesHandler = async (_req: Request, res: Response, next: NextFunction) => {

  try {
    const campaignTypesList = await listCampaignTypes.list()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of campaign types',
      data: campaignTypesList
    }).send(res)
    
  } catch (error) {
    next(error)
  }
}