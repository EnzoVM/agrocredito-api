import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import PaymentCreateModel from "../domain/payment.create.model"
import PaymentListModel from "../domain/payment.list.model"
import PaymentPersistanceRepository from "../domain/payment.persistance.repository"
import PaymentResponseModel from "../domain/payment.response.model"

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
            paymentDateTime: payment.payment_datetime,
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

  async getTotalAmountByCampaignId ({ campaignId }: { campaignId: string }): Promise<number> {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          credit_request: true
        },
        where: {
          credit_request: {
            campaign_id: campaignId
          }
        }
      })
  
      const totalAmount = payments.reduce((accum, payment) => accum + Number(payment.payment_amount_USD), 0)
  
      return totalAmount
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
          paymentDateTime: payment.payment_datetime,
          financialSourceDescription: payment.financial_source.financial_source_description,
          currentAccountDescription: payment.current_account.current_account_description,
          paymentDescription: payment.payment_description,
          paymentAmount: Number(payment.payment_amount_USD), 
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'payment' })
    }
  }

  async createPayment ({ payment }: { payment: PaymentCreateModel }): Promise<PaymentResponseModel> {
    try {
      const paymentAdded = await prisma.payment.create({
        data: {
          credit_request_id: payment.creditRequestId,
          payment_datetime: payment.paymentDateTime,
          financial_source_id: payment.financialSourceId,
          current_account_id: payment.currentAccountId,
          payment_description: payment.paymentDescription,
          payment_amount_USD: payment.paymentAmountUSD,
          payment_amount_PEN: payment.paymentAmountPEN
        }
      })

      return {
        paymentId: paymentAdded.payment_id,
        creditRequestId: paymentAdded.credit_request_id,
        paymentDateTime: String(paymentAdded.payment_datetime),
        financialSourceId: paymentAdded.financial_source_id,
        currentAccountId: paymentAdded.current_account_id,
        paymentDescription: paymentAdded.payment_description,
        paymentAmountUSD: Number(paymentAdded.payment_amount_USD),
        paymentAmountPEN: Number(paymentAdded.payment_amount_PEN),
      }
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'payment'})
    }
  }
}