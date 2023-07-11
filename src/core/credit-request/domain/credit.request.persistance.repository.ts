import CreditRequest from "./credit.request.model"

export default interface CreditRequestPersistanceRepository {
  listCreditRequestByCampaignId: (campaignId: string) => Promise<CreditRequest[]>
  getNumberOfCreditRequestByFarmer: ({ farmerId }: { farmerId: string }) => Promise<number>
}