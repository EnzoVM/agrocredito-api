import PrismaConnection from "../../../prisma/prisma.connection"
import DeliveryListModel from "../domain/delivery.list.model"
import DeliveryPersistanceRepository from "../domain/delivery.persistance.respository"

const prisma = new PrismaConnection().connection

export default class DeliveryPrismaRepository implements DeliveryPersistanceRepository {
  async listDeliveries ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }): Promise<{ deliveries: DeliveryListModel[], count: number }> {
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
          socialReason: delivery.credit_request.farmer.social_reason || undefined,
          deliveryDateTime: delivery.delivery_datetime,
          providerDescription: delivery.provider.provider_description,
          financialSourceDescription: delivery.financial_source.financial_source_description,
          currentAccountDescription: delivery.current_account.current_account_description,
          gloss: delivery.gloss,
          deliveryAmount: Number(delivery.delivery_amount)
        }
      }),
      count
    }
  }
}