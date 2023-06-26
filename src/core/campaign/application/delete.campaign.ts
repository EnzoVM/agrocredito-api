import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import CreditRequestPersistanceRepository from "../../credit-request/domain/credit.request.persistance.repository"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"

export default class DeleteCampaign {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository, creditRequestPersistanceRepository: CreditRequestPersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
    this.creditRequestPersistanceRepository = creditRequestPersistanceRepository
  }

  async delete ({campaignId}:{campaignId: string}): Promise<string> {

    const creditRequestList = await this.creditRequestPersistanceRepository.listCreditRequestByCampaignId(campaignId)
    if(creditRequestList.length > 0) {
      throw new ProcessError({ message: 'It cannot be deleted because there are requests for associated credits', core: 'Campaign'})
    }  
    
    const campaignMessageDeleted = await this.campaignPersistanceRepository.deleteCampaign(campaignId)

    return campaignMessageDeleted
        
  }
}