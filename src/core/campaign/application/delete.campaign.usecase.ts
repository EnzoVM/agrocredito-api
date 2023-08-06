import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"

export default class DeleteCampaignUseCase {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository, creditRequestPersistanceRepository: CreditRequestPersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
    this.creditRequestPersistanceRepository = creditRequestPersistanceRepository
  }

  async invoke ({campaignId}:{campaignId: string}): Promise<string> {

    const creditRequestList = await this.creditRequestPersistanceRepository.listCreditRequestByCampaignId({campaignId})
    if(creditRequestList.length > 0) {
      throw new ProcessError({ message: 'No se puede borrar esta campaña porque tiene créditos asociados', core: 'Campaign'})
    }  
    
    const campaignMessageDeleted = await this.campaignPersistanceRepository.deleteCampaign(campaignId)

    return campaignMessageDeleted
        
  }
}