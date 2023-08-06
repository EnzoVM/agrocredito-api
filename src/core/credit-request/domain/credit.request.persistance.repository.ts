import CreditRequestList from "./credit.request.list.model"
import CreditRequestCreate from "./credit.request.create.model"
import CreditRequestDetail from "./credit.request.detail.model"
import { CreditRequestStatusType } from "./credit.request.status.type"
import CreditRequestListApproved from "./credit.request.list.approved"

export default interface CreditRequestPersistanceRepository {
  
  listCreditRequestByCampaignId: ({campaignId}:{campaignId: string}) => Promise<CreditRequestCreate[]>
  getNumberOfCreditRequestByFarmer: ({ farmerId }: { farmerId: string }) => Promise<number>
  listCreditRequest: ({ campaignId, farmerType, creditRequestStatus, farmerFullNames, farmerSocialReason }: { campaignId: string, farmerType: 'Individual' | 'Asociación' | 'All', creditRequestStatus?: string, farmerFullNames?: string, farmerSocialReason?: string  }) => Promise<{ creditRequests: CreditRequestList[], count: number }>
  createCreditRequest: ({ creditRequest }: { creditRequest: CreditRequestCreate }) => Promise<CreditRequestCreate>
  getCreditRequestByFarmerId: ({ farmerId }: { farmerId: string }) => Promise<CreditRequestCreate[]>
  getCreditRequestById: ({ creditRequestId }: { creditRequestId: string }) => Promise<CreditRequestDetail | null>
  updateCreditRequestStatusById: ({ creditRequestStatus, creditRequestId, updateStatusDateTime }: { creditRequestStatus: CreditRequestStatusType, creditRequestId: string, updateStatusDateTime: Date }) => Promise<string>
  listApprovedCreditRequestByFarmerId: ({ farmerId, campaignId }: { farmerId: string, campaignId: string }) => Promise<CreditRequestListApproved[]>
}