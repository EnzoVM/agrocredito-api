import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import FarmerPersistanceRepository from "../../farmer/domain/farmer.persistance.repository"
import ProjectPersistanceRepository from "../domain/project.persistance.repository"


export default class DeleteProjectByIdUseCase {

  constructor(
    private readonly projectPersistanceRepository: ProjectPersistanceRepository,
    private readonly farmerPersistanceRepository: FarmerPersistanceRepository
  ) {}

  async invoke ({
    projectId
  }:{
    projectId: number
  }): Promise<string> {
    
    if(!projectId){
      throw new BadRequestError({ message: 'Se tiene que especificar el id del proyecto a eliminar', core: 'Project'})
    }

    if(typeof projectId !== 'number'){
      throw new BadRequestError({ message: 'El id del proyecto tiene que ser un número', core: 'Project'})
    }

    const projectFound = await this.projectPersistanceRepository.getProjectById({projectId})
    if(!projectFound){
      throw new NotFoundError({message: 'El proyecto no ha eliminado porque no existe', core: 'Project'})
    }

    const farmerCount = await this.farmerPersistanceRepository.countFarmerMatchToProject({
      projectSectorId: projectFound.projectSectorId,
      projectCode: projectFound.projectCode
    })
    if(farmerCount !== 0){
      throw new ProcessError({message: 'No se ha podido eliminar el proyecto, porque tiene agricultores asociados', core:'Project'})
    }
    
    const projectDeletedMessage = await this.projectPersistanceRepository.deleteProjectById({projectId})
    
    return projectDeletedMessage
  }
}