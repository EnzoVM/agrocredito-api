import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import CampaignTypePersistanceRepository from "../domain/campaign.type.persistance.repository";

export default class ListPeriodByCampaignType {
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async list ({campaignTypeId}:{campaignTypeId: number}): Promise<string[]> {

    const campaignTypeFound = await this.campaignTypePersistanceRepository.getCampaignTypeById(campaignTypeId)
    if(!campaignTypeFound){
      throw new ProcessError({ message: 'Campaign Type does not exist', core: 'Campaign Type'})
    }

    const listOfPeriod = Array.from({ length: campaignTypeFound.periodQuantity }, (_, index) => `Periodo ${index + 1}`)
    
    return listOfPeriod
  }
}