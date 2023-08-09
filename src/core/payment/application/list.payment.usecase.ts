import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import { FarmerType } from "../../farmer/domain/farmer.type"
import PaymentListModel from "../domain/payment.list.model"
import PaymentPersistanceRepository from "../domain/payment.persistance.repository"

export default class ListPaymentUseCase {
  constructor (private readonly paymentPersistanceRepository: PaymentPersistanceRepository) {}

  async list ({ 
    campaignId,
    farmerType, 
    fullNames, 
    socialReason,
    page,
    limit
  } : { 
    campaignId: string,
    farmerType: FarmerType, 
    fullNames?: string, 
    socialReason?: string,
    page: number,
    limit: number
  }) {
    if (
      typeof campaignId === 'undefined' ||
      typeof farmerType === 'undefined' ||
      typeof page === 'undefined' ||
      typeof limit === 'undefined'
    ) {
      throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
    }

    if (!Object.values(FarmerType).includes(farmerType)) {
      throw new BadRequestError({ message: 'Farmer type is invalid', core: 'farmer' })
    }

    let finalCount: number = 0
    let finalPayments: PaymentListModel[] = []
    let finalTotalAmount: number = 0

    if (farmerType === FarmerType.INDIVIDUAL) {
      if (typeof fullNames === 'undefined') {
        throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
      }

      const { payments, count } = await this.paymentPersistanceRepository.listPayments({ campaignId, farmerType, fullNames })
      finalPayments = payments
      finalCount = count
      finalTotalAmount = await this.paymentPersistanceRepository.getTotalAmountByCampaignId({ campaignId })
    }

    if (farmerType === FarmerType.ASSOCIATION) {
      if (typeof socialReason === 'undefined') {
        throw new BadRequestError({ message: 'You must to specify a valid json', core: 'delivery' })
      }
  
      const { payments, count } = await this.paymentPersistanceRepository.listPayments({ campaignId, farmerType, socialReason })
  
      finalPayments = payments
      finalCount = count
      finalTotalAmount = await this.paymentPersistanceRepository.getTotalAmountByCampaignId({ campaignId })
    }

    if (farmerType === FarmerType.ALL) {  
      const { payments, count } = await this.paymentPersistanceRepository.listPayments({ campaignId, farmerType })
  
      finalPayments = payments
      finalCount = count
      finalTotalAmount = await this.paymentPersistanceRepository.getTotalAmountByCampaignId({ campaignId })
    }

    if (limit > 0) {
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      finalPayments = finalPayments.slice(startIndex, endIndex)
    }

    return {
      payments: finalPayments,
      count: finalCount,
      totalAmount: finalTotalAmount
    }
  }
}