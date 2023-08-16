import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error";
import SectorListModel from "../domain/sector.list.model";
import SectorPersistanceRepository from "../domain/sector.persistance.repository";

export default class CreateSectorUseCase {

  constructor(
    private readonly sectorPersistanceRepository: SectorPersistanceRepository
  ) {}

  async invoke ({
    sectorDescription
  }:{
    sectorDescription: string
  }): Promise<SectorListModel> {

    if(!sectorDescription){
      throw new BadRequestError({ message: 'Se tiene que especificar el nombre del nuevo sector', core: 'Sector'})
    }

    if(typeof sectorDescription !== 'string'){
      throw new BadRequestError({ message: 'El nombre del nuevo sector no puede ser un número', core: 'Sector'})
    }
    
    const sectorAdded = await this.sectorPersistanceRepository.createSector({sectorDescription})
    return sectorAdded
  }
}