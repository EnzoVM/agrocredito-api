import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import PaymentListModel from "../domain/payment.list.model"
import PaymentPersistanceRepository from "../domain/payment.persistance.repository"

const prisma = new PrismaConnection().connection

export default class PaymentPrismaRepository implements PaymentPersistanceRepository {
 
  async listPayments ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }): Promise<{ payments: PaymentListModel[], count: number }> {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          financial_source: true,
          current_account: true,
          credit_request: {
            include: {
              farmer: true
            }
          }
        },
        where: {
          credit_request: {
            farmer: {
              full_names: {
                contains: fullNames
              },
              social_reason: {
                contains: socialReason
              },
              farmer_type: farmerType === 'All' ? undefined : farmerType,
            },
            campaign_id: campaignId
          }
        }
      })
  
      const count = payments.length
  
      return {
        payments: payments.map(payment => {
          return {
            paymentId: payment.payment_id,
            fullNames: payment.credit_request.farmer.full_names || undefined,
            socialReason: payment.credit_request.farmer.social_reason || undefined,
            deliveryDateTime: payment.payment_datetime,
            financialSourceDescription: payment.financial_source.financial_source_description,
            currentAccountDescription: payment.current_account.current_account_description,
            paymentDescription: payment.payment_description,
            paymentAmount: Number(payment.payment_amount_USD), 
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'payment' })
    }
  }

  async listPaymentsByCreditRequestId ({ creditRequestId, take }: { creditRequestId: string, take?: number }): Promise<PaymentListModel[]> {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          financial_source: true,
          current_account: true,
          credit_request: {
            include: {
              farmer: true
            }
          }
        },
        where: {
          credit_request_id: creditRequestId
        },
        orderBy: {
          payment_datetime: 'desc'
        },
        take
      })

      return payments.map(payment => {
        return {
          paymentId: payment.payment_id,
          fullNames: payment.credit_request.farmer.full_names || undefined,
          socialReason: payment.credit_request.farmer.social_reason || undefined,
          deliveryDateTime: payment.payment_datetime,
          financialSourceDescription: payment.financial_source.financial_source_description,
          currentAccountDescription: payment.current_account.current_account_description,
          paymentDescription: payment.payment_description,
          paymentAmount: Number(payment.payment_amount_USD), 
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'delivery' })
    }
  }
}