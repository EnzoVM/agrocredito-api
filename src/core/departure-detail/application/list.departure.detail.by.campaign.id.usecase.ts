import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import DepartureDetailList from "../domain/departure.detail.list.model"
import DepartureDetailPersistanceRepository from "../domain/departure.detail.persistance.repository"


export default class ListDepartureDetailByCampaignId {

  constructor(
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository,
  ) {}

  async invoke ({
    campaignId
  }:{
    campaignId: string
  }): Promise<DepartureDetailList[]>{
    
    const departureDetailFound = await this.departureDetailPersistanceRepository.getDepartureDetailByCampaignId({campaignId})
    if(!departureDetailFound){
      throw new ProcessError({ message: 'Debe de crear un modelo de plan de entregas y una partida', core: 'Credit Request'})
    }
    if(departureDetailFound.length === 0){
      throw new ProcessError({ message: 'Debe de crear una partida como mínimo', core: 'Credit Request'})
    }
    
    return departureDetailFound
  }
}