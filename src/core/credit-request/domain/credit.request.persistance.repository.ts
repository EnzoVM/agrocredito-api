import CreditRequestList from "./credit.request.list.model"
import CreditRequest from "./credit.request.model"

export default interface CreditRequestPersistanceRepository {
  
  listCreditRequestByCampaignId: (campaignId: string) => Promise<CreditRequest[]>
  getNumberOfCreditRequestByFarmer: ({ farmerId }: { farmerId: string }) => Promise<number>
  listCreditRequest: ({ farmerType, creditRequestStatus, farmerFullNames, farmerSocialReason }: { farmerType: 'Individual' | 'Asociación', creditRequestStatus?: string, farmerFullNames?: string, farmerSocialReason?: string  }) => Promise<{ creditRequests: CreditRequestList[], count: number }>
  createCreditRequest: ({creditRequest}:{creditRequest: CreditRequest}) => Promise<CreditRequest>
  getCreditRequestByFarmerId: ({ farmerId }: { farmerId: string }) => Promise<CreditRequest[]>
  
}