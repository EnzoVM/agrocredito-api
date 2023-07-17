import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import { FarmerType } from "../../farmer/domain/farmer.type"
import CreditRequestList from "../domain/credit.request.list.model"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"
import { CreditRequestStatusType } from "../domain/credit.request.status.type"

export default class ListCreditRequestUseCase {
  constructor (private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository) {}

  async list ({ 
    farmerType,
    creditRequestStatus,
    farmerFullNames,
    farmerSocialReason,
    page,
    limit
  }: {
    farmerType: FarmerType, 
    creditRequestStatus?: CreditRequestStatusType, 
    farmerFullNames?: string, 
    farmerSocialReason?: string,
    page: number, 
    limit: number
  }): Promise<{ creditRequests: CreditRequestList[], count: number }> {
    if (
      !page ||
      !limit
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
    }

    if (!Object.values(FarmerType).includes(farmerType)) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    if (creditRequestStatus) {
      if (!Object.values(CreditRequestStatusType).includes(creditRequestStatus)) {
        throw new BadRequestError({ message: 'Credit request type is invalid', core: 'farmer' })
      }
    }

    let finalCount: number = 0
    let finalCreditRequest: CreditRequestList[] = []

    if (farmerType === FarmerType.INDIVIDUAL) {
      if (typeof farmerFullNames === 'undefined') {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
      }

      const { creditRequests, count } = await this.creditRequestPersistanceRepository.listCreditRequest({ farmerType, creditRequestStatus, farmerFullNames })

      finalCreditRequest = creditRequests
      finalCount = count
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      if (typeof farmerSocialReason === 'undefined') {
        throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
      }
  
      const { creditRequests, count } = await this.creditRequestPersistanceRepository.listCreditRequest({ farmerType, creditRequestStatus, farmerFullNames })
  
      finalCreditRequest = creditRequests
      finalCount = count
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const creditRequestsSliced = finalCreditRequest.slice(startIndex, endIndex)

    return {
      creditRequests: creditRequestsSliced,
      count: finalCount
    }
  }
}