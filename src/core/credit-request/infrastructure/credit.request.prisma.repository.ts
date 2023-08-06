import CreditRequestCreate from "../domain/credit.request.create.model"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import CreditRequestList from "../domain/credit.request.list.model"
import CreditRequestDetail from "../domain/credit.request.detail.model"
import { CreditRequestStatusType } from "../domain/credit.request.status.type"
import CreditRequestListApproved from "../domain/credit.request.list.approved"

const prisma = new PrismaConnection().connection

export default class CreditRequestPrimaRepository implements CreditRequestPersistanceRepository {
  
  async listCreditRequestByCampaignId({ campaignId }: { campaignId: string }): Promise<CreditRequestCreate[]> {
    try {
      const creditRequestList = await prisma.credit_request.findMany({
        where: {
          campaign_id: campaignId
        }
      })

      return creditRequestList.map(credit => {
        return {
          creditRequestId: credit.credit_request_id,
          farmerId: credit.farmer_id,
          campaignId: credit.campaign_id,
          hectareNumber: credit.hectare_number,
          creditReason: credit.credit_reason,
          creditAmount: Number(credit.credit_amount),
          guaranteeDescription: credit.guarantee_description,
          guaranteeAmount: Number(credit.guarantee_amount),
          technicalId: credit.technical_id,
          creditRequestStatus: credit.credit_request_status,
          creditRequestObservation: credit.credit_request_observation
        }
      })

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async getNumberOfCreditRequestByFarmer ({ farmerId }: { farmerId: string }): Promise<number> {
    try {
      const creditRequestCount = await prisma.credit_request.count({
        where: {
          farmer_id: farmerId
        }
      })

      return creditRequestCount
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async listCreditRequest ({ campaignId, farmerType, creditRequestStatus, farmerFullNames, farmerSocialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', creditRequestStatus?: string, farmerFullNames?: string | undefined, farmerSocialReason?: string | undefined }): Promise<{ creditRequests: CreditRequestList[], count: number }> {
    try {
      const creaditRequestFound = await prisma.credit_request.findMany({
        where: {
          campaign_id: campaignId,
          credit_request_status: creditRequestStatus,
          farmer: {
            farmer_type: farmerType === 'All' ? undefined : farmerType,
            full_names: {
              contains: farmerFullNames
            },
            social_reason: {
              contains: farmerSocialReason
            }
          }
        },
        include: {
          farmer: true
        },
        orderBy: {
          create_datetime: 'desc'
        }
      })

      const count = creaditRequestFound.length

      return {
        creditRequests: creaditRequestFound.map(creaditRequest => {
          return {
            creditRequestId: creaditRequest.credit_request_id,
            campaignId: creaditRequest.campaign_id,
            fullNames: creaditRequest.farmer.full_names || undefined,
            socialReason: creaditRequest.farmer.social_reason || undefined,
            creditAmount: Number(creaditRequest.credit_amount),
            createDateTime: creaditRequest.create_datetime,
            updateStatusDateTime: creaditRequest.update_status_datetime || undefined,
            creditRequestStatus: creaditRequest.credit_request_status
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async createCreditRequest ({ creditRequest }: { creditRequest: CreditRequestCreate }): Promise<CreditRequestCreate> {
    try {
      const creditRequestCreated = await prisma.credit_request.create({
        data: {
          credit_request_id: creditRequest.creditRequestId,
          farmer_id: creditRequest.farmerId,
          campaign_id: creditRequest.campaignId,
          hectare_number: creditRequest.hectareNumber,
          credit_reason: creditRequest.creditReason,
          credit_amount: creditRequest.creditAmount,
          guarantee_description: creditRequest.guaranteeDescription,
          guarantee_amount: creditRequest.guaranteeAmount,
          technical_id: creditRequest.technicalId,
          credit_request_observation: creditRequest.creditRequestObservation
        }
      })

      return {
        creditRequestId: creditRequestCreated.credit_request_id,
        farmerId: creditRequestCreated.farmer_id,
        campaignId: creditRequestCreated.campaign_id,
        hectareNumber: creditRequestCreated.hectare_number,
        creditReason: creditRequestCreated.credit_reason,
        creditAmount: Number(creditRequestCreated.credit_amount),
        guaranteeDescription: creditRequestCreated.guarantee_description,
        guaranteeAmount: Number(creditRequestCreated.guarantee_amount),
        technicalId: creditRequestCreated.technical_id,
        creditRequestStatus: creditRequestCreated.credit_request_status,
        creditRequestObservation: creditRequestCreated.credit_request_observation
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async getCreditRequestByFarmerId ({ farmerId }: { farmerId: string }): Promise<CreditRequestCreate[]> {
    try {
      const creditRequestFound = await prisma.credit_request.findMany({
        where: {
          farmer_id: farmerId,
          OR: [
            { 
              credit_request_status: 'Aprobado'
            },
            { 
              credit_request_status: 'Pendiente'
            }
          ]
        }
      })

      return creditRequestFound.map(credit => {
        return {
          creditRequestId: credit.credit_request_id,
          farmerId: credit.farmer_id,
          campaignId: credit.campaign_id,
          hectareNumber: credit.hectare_number,
          creditReason: credit.credit_reason,
          creditAmount: Number(credit.credit_amount),
          guaranteeDescription: credit.guarantee_description,
          guaranteeAmount: Number(credit.guarantee_amount),
          technicalId: credit.technical_id,
          creditRequestStatus: credit.credit_request_status,
          creditRequestObservation: credit.credit_request_observation
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async getCreditRequestById ({ creditRequestId }: { creditRequestId: string }): Promise<CreditRequestDetail | null> {
    try {
      const creditRequestFound = await prisma.credit_request.findUnique({
        where: {
          credit_request_id: creditRequestId
        },
        include: {
          farmer: true,
          technical: {
            include: {
              assistance_type: true
            }
          }
        },
      })

      if (!creditRequestFound) {
        return null
      }

      return {
        creditRequestId: creditRequestFound.credit_request_id,
        farmerId: creditRequestFound.farmer.farmer_id,
        farmerFullNames: creditRequestFound.farmer.full_names || undefined,
        farmerSocialReason: creditRequestFound.farmer.social_reason || undefined,
        campaignId: creditRequestFound.campaign_id,
        hectareNumber: creditRequestFound.hectare_number,
        creditReason: creditRequestFound.credit_reason,
        creditAmount: Number(creditRequestFound.credit_amount),
        guaranteeDescription: creditRequestFound.guarantee_description,
        guaranteeAmount: Number(creditRequestFound.guarantee_amount),
        technicalName: creditRequestFound.technical.technical_name,
        assistanceTypeDescription: creditRequestFound.technical.assistance_type.assistance_type_description,
        creditRequestStatus: creditRequestFound.credit_request_status,
        creditRequestObservation: creditRequestFound.credit_request_observation,
        createDateTime: creditRequestFound.create_datetime,
        updateStatusDateTime: creditRequestFound.update_status_datetime || undefined
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async updateCreditRequestStatusById ({ creditRequestStatus, creditRequestId, updateStatusDateTime }: { creditRequestStatus: CreditRequestStatusType, creditRequestId: string, updateStatusDateTime: Date }): Promise<string> {
    try {
      await prisma.credit_request.update({
        data: {
          credit_request_status: creditRequestStatus,
          update_status_datetime: updateStatusDateTime
        },
        where: {
          credit_request_id: creditRequestId
        }
      })

      return 'Update successfully'
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async listApprovedCreditRequestByFarmerId ({ 
    farmerId,
    campaignId
  }:{ 
    farmerId: string,
    campaignId: string
  }): Promise<CreditRequestListApproved[]> {
    try {
      const creditRequestList = await prisma.credit_request.findMany({
        where: {
          campaign_id: campaignId,
          farmer_id: farmerId,
          credit_request_status: 'Aprobado'
        }
      })
      
      return creditRequestList.map(credit => {
        return {
          creditRequestId: credit.credit_request_id,
          creditAmount: Number(credit.credit_amount),
          createDateTime: credit.create_datetime
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }
}