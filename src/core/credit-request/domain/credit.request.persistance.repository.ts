import CreditRequestList from "./credit.request.list.model"
import CreditRequestCreate from "./credit.request.create.model"

export default interface CreditRequestPersistanceRepository {
  
  listCreditRequestByCampaignId: ({campaignId}:{campaignId: string}) => Promise<CreditRequestCreate[]>
  getNumberOfCreditRequestByFarmer: ({ farmerId }: { farmerId: string }) => Promise<number>
  listCreditRequest: ({ farmerType, creditRequestStatus, farmerFullNames, farmerSocialReason }: { farmerType: 'Individual' | 'Asociación', creditRequestStatus?: string, farmerFullNames?: string, farmerSocialReason?: string  }) => Promise<{ creditRequests: CreditRequestList[], count: number }>
  createCreditRequest: ({creditRequest}:{creditRequest: CreditRequestCreate}) => Promise<CreditRequestCreate>
  getCreditRequestByFarmerId: ({farmerId}: {farmerId: string}) => Promise<CreditRequestCreate[]>
  
}