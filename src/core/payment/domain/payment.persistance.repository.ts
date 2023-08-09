import PaymentListModel from "./payment.list.model"

export default interface PaymentPersistanceRepository {
  listPayments: ({ campaignId, farmerType, fullNames, socialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', fullNames?: string, socialReason?: string }) => Promise<{ payments: PaymentListModel[], count: number}>
  listPaymentsByCreditRequestId: ({ creditRequestId, take }: { creditRequestId: string, take?: number }) => Promise<PaymentListModel[]>
  getTotalAmountByCampaignId ({ campaignId }: { campaignId: string }): Promise<number>
}