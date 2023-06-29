import {Request, Response, NextFunction } from "express"
import CreateCampaign from "../core/campaign/application/create.campaign"
import DeleteCampaign from "../core/campaign/application/delete.campaign"
import ListCampaign from "../core/campaign/application/list.campaign"
import CampaignPrismaRepository from "../core/campaign/infraestructure/prisma/campaign.prisma.repository"
import CampaignTypePrismaRepository from "../core/campaing-type/infrastructure/campaign.type.prisma.repository"
import CreditRequestPrimaRepository from "../core/credit-request/infrastructure/credit.request.prisma.repository"
import { validate } from "class-validator"
import CampaignDTO from "../dto/campaign.dto"
import BadRequestError from "../utils/custom-errors/application-errors/bad.request.error"
import ResponseModel from "../utils/standar-response/response.model"
import { ResponseStatusCodes } from "../utils/standar-response/response.status.codes"
import { ResponseCodes } from "../utils/standar-response/response.codes"

const createCampaign = new CreateCampaign(new CampaignPrismaRepository, new CampaignTypePrismaRepository)
const deleteCampaign = new DeleteCampaign(new CampaignPrismaRepository, new CreditRequestPrimaRepository)
const listCampaign = new ListCampaign(new CampaignPrismaRepository)

export const createCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {campaignDescription, campaignTypeId, campaignYear, startDate, finishDate} = req.body

  try {
    const errorDataCampaign = await validate(new CampaignDTO({
      campaignDescription,
      campaignTypeId,
      campaignYear,
      startDate,
      finishDate
    }))

    if(errorDataCampaign.length > 0) {
      const errorMessages = errorDataCampaign.map((error) => error.constraints ? Object.values(error.constraints): []).flat()
      throw new BadRequestError({ message: errorMessages.join(', '), core: 'Campaign'})
    }

    const campaignCreated = await createCampaign.create({
      campaignDescription, 
      campaignTypeId, 
      campaignYear,
      startDate, 
      finishDate
    })

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The campaign has been created successfully',
      data: campaignCreated
    }).send(res)

  } catch (error) {
    next(error)
  }
}


export const deleteCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { campaignId } = req.params

  try {
    const campaingMessageDeleted = await deleteCampaign.delete({campaignId})

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'The campaign has been successfully deleted',
      data: campaingMessageDeleted
    }).send(res)

  } catch (error) {
    next(error)
  }
}


export const listCampaignHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { json } = req.params

  const {filter, page, limit, typeSearch} = JSON.parse(json)
  
  if(!typeSearch || !page || !limit ){
    throw new BadRequestError({ message: 'Data is missing', core: 'Campaign'})
  }
  
  if(typeSearch !== 'code' && typeSearch !== 'year' && typeSearch !== 'all'){
    throw new BadRequestError({ message: 'TypeSearch is invalid', core: 'Campaign'})
  }

  try {

    let campaignList: { campaignId: string, campaignDescription: string, campaignTypeDescription: string, periodName: string }[] = []
    let count: number = 0

    if(typeSearch === 'code'){
      const { campaign, count: countCampaign } = await listCampaign.list({
        campaignId: filter,
        page: Number(page),
        limit: Number(limit),
        typeSearch
      })

      campaignList = campaign
      count = countCampaign
    } else if(typeSearch === 'year'){
      const { campaign, count: countCampaign } = await listCampaign.list({
        campaignYear: filter,
        page: Number(page),
        limit: Number(limit),
        typeSearch
      })

      campaignList = campaign
      count = countCampaign
    } else if(typeSearch === 'all'){
      const { campaign, count: countCampaign } = await listCampaign.list({
        page: Number(page),
        limit: Number(limit),
        typeSearch
      })

      campaignList = campaign
      count = countCampaign
    }

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'List of campaigns',
      data: {
        campaignList,
        count
      }
    }).send(res)

  } catch (error) {
    next(error)
  }
}