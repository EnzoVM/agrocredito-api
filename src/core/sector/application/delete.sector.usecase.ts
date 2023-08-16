import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error";
import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import ProjectPersistanceRepository from "../../project/domain/project.persistance.repository";
import SectorPersistanceRepository from "../domain/sector.persistance.repository";

export default class DeleteSectorUseCase {
  
  constructor(
    private readonly sectorPersistanceRepository: SectorPersistanceRepository,
    private readonly projectPersistanceRepository: ProjectPersistanceRepository
  ) {}

  async invoke ({
    sectorId
  }:{
    sectorId: number
  }): Promise<string> {

    if(!sectorId){
      throw new BadRequestError({ message: 'Se tiene que especificar el id del sector a eliminar', core: 'Sector'})
    }

    if(typeof sectorId !== 'number'){
      throw new BadRequestError({ message: 'El id del sector tiene que ser un número', core: 'Sector'})
    }
    
    const projectFound = await this.projectPersistanceRepository.getProjectsBySector({sectorId})
    if(projectFound.length > 0){
      throw new ProcessError({ message: 'No se ha podido eliminar el sector, porque tiene proyectos asociados', core: 'Sector'})
    }

    const sectorDeletedMessage = await this.sectorPersistanceRepository.deleteSectorById({sectorId})
    return sectorDeletedMessage
  }
}