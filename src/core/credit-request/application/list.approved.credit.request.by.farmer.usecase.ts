import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import CreditRequestCreate from "../domain/credit.request.create.model"
import CreditRequestListApproved from "../domain/credit.request.list.approved"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"

export default class ListApprovedCreditRequestByFarmerUseCase {
  constructor(
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository
  ) {}

  async invoke ({farmerId, campaignId}:{farmerId: string, campaignId: string}): Promise<CreditRequestListApproved[]>{
    const creditRequestList = await this.creditRequestPersistanceRepository.listApprovedCreditRequestByFarmerId({farmerId, campaignId})
    if(creditRequestList.length === 0){
      throw new NotFoundError({ message: 'No se ha encontrado creditos aprobados para este usuario', core: 'Credit Request'})
    }
    
    return creditRequestList
  }
}