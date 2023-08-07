import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import DeliveryCreateModel from "../domain/delivery.create.model"
import DeliveryListModel from "../domain/delivery.list.model"
import DeliveryPersistanceRepository from "../domain/delivery.persistance.respository"
import DeliveryResponseModel from "../domain/delivery.response.model"

const prisma = new PrismaConnection().connection

export default class DeliveryPrismaRepository implements DeliveryPersistanceRepository {
 
  async listDeliveries ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }): Promise<{ deliveries: DeliveryListModel[], count: number }> {
    try {
      const deliveries = await prisma.delivery.findMany({
        include: {
          provider: true,
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
  
      const count = deliveries.length
  
      return {
        deliveries: deliveries.map(delivery => {
          return {
            deliveryId: delivery.delivery_id,
            fullNames: delivery.credit_request.farmer.full_names || undefined,
            socialReason: delivery.credit_request.farmer.social_reason || undefined,
            deliveryDateTime: delivery.delivery_datetime,
            providerDescription: delivery.provider.provider_description,
            financialSourceDescription: delivery.financial_source.financial_source_description,
            currentAccountDescription: delivery.current_account.current_account_description,
            gloss: delivery.gloss,
            deliveryAmount: Number(delivery.delivery_amount_USD)
          }
        }),
        count
      }
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'delivery' })
    }
  }

  async listDeliveriesByCreditRequestId ({ creditRequestId }: { creditRequestId: string }): Promise<DeliveryListModel[]> {
    try {
      const deliveries = await prisma.delivery.findMany({
        include: {
          provider: true,
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
        }
      })

      return deliveries.map(delivery => {
        return {
          deliveryId: delivery.delivery_id,
          fullNames: delivery.credit_request.farmer.full_names || undefined,
          socialReason: delivery.credit_request.farmer.social_reason || undefined,
          deliveryDateTime: delivery.delivery_datetime,
          providerDescription: delivery.provider.provider_description,
          financialSourceDescription: delivery.financial_source.financial_source_description,
          currentAccountDescription: delivery.current_account.current_account_description,
          gloss: delivery.gloss,
          deliveryAmount: Number(delivery.delivery_amount_USD)
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'delivery' })
    }
  }

  async createDelivery ({ delivery }: { delivery: DeliveryCreateModel }): Promise<DeliveryResponseModel> {
    try {
      const deliveryAdded = await prisma.delivery.create({
        data: {
          credit_request_id: delivery.creditRequestId,
          delivery_datetime: delivery.deliveryDatetime,
          provider_id: delivery.providerId,
          financial_source_id: delivery.financialSourceId,
          current_account_id: delivery.currentAccountId,
          gloss: delivery.gloss,
          delivery_amount_USD: delivery.deliveryAmountUSD,
          delivery_amount_PEN: delivery.deliveryAmountPEN
        }
      })
      
      return {
        deliveryId: deliveryAdded.delivery_id,
        creditRequestId: deliveryAdded.credit_request_id,
        deliveryDatetime: String(deliveryAdded.delivery_datetime),
        providerId: deliveryAdded.provider_id,
        financialSourceId: deliveryAdded.financial_source_id,
        currentAccountId: deliveryAdded.current_account_id,
        gloss: deliveryAdded.gloss,
        deliveryAmountUSD: Number(deliveryAdded.delivery_amount_USD),
        deliveryAmountPEN: Number(deliveryAdded.delivery_amount_PEN)
      }
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery'})
    }
  }

  async countDeliveriesByCreditRequestId ({ 
    creditRequestId 
  }:{ 
    creditRequestId: string 
  }): Promise<number> {
    try {
      const deliveriesCount = await prisma.delivery.count({
        where: {
          credit_request_id: creditRequestId
        }
      })

      return deliveriesCount

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Delivery'})
    }
  }
}