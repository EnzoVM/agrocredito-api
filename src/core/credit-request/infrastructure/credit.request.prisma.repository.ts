import CreditRequest from "../domain/credit.request.model"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import CreditRequestList from "../domain/credit.request.list.model"

const prisma = new PrismaConnection().connection

export default class CreditRequestPrimaRepository implements CreditRequestPersistanceRepository {

  async listCreditRequestByCampaignId(campaignId: string): Promise<CreditRequest[]> {
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
          tecniqueId: credit.tecnique_id,
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

  async listCreditRequest ({ farmerType, creditRequestStatus, farmerFullNames, farmerSocialReason }: { farmerType: "Individual" | "Asociación"; creditRequestStatus?: string; farmerFullNames?: string | undefined; farmerSocialReason?: string | undefined }): Promise<{ creditRequests: CreditRequestList[], count: number }> {
    try {
      const creaditRequestFound = await prisma.credit_request.findMany({
        where: {
          credit_request_status: creditRequestStatus,
          farmer: {
            farmer_type: farmerType,
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
        }
      })

      const count = creaditRequestFound.length

      return {
        creditRequests: creaditRequestFound.map(creaditRequest => {
          return {
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

  async createCreditRequest ({ creditRequest }: { creditRequest: CreditRequest }): Promise<CreditRequest> {
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
          tecnique_id: creditRequest.tecniqueId,
          credit_request_status: creditRequest.creditRequestStatus,
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
        tecniqueId: creditRequestCreated.tecnique_id,
        creditRequestStatus: creditRequestCreated.credit_request_status,
        creditRequestObservation: creditRequestCreated.credit_request_observation
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }

  async getCreditRequestByFarmerId ({ farmerId }: { farmerId: string }): Promise<CreditRequest[]> {
    try {
      const creditRequestFound = await prisma.credit_request.findMany({
        where: {
          farmer_id: farmerId
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
          tecniqueId: credit.tecnique_id,
          creditRequestStatus: credit.credit_request_status,
          creditRequestObservation: credit.credit_request_observation
        }
      })
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'credit-request' })
    }
  }
}