import CreditRequest from "../domain/credit.request.model"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"

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
      throw new UnavailableError({ message: error.message, core: 'Credit Request' })
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
      throw new UnavailableError({ message: error.message, core: 'farmer' })
    }
  }
}