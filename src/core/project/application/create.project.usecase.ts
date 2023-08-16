import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProjectCreateModel from "../domain/project.create.model"
import Project from "../domain/project.model"
import ProjectPersistanceRepository from "../domain/project.persistance.repository"

export default class CreateProjectUseCase {

  constructor(
    private readonly projectPersistanceRepository: ProjectPersistanceRepository
  ) {}
  
  async invoke ({
    projectDescription,
    sectorId
  }:{
    projectDescription: string,
    sectorId: number
  }): Promise<Project> {

    if(
      !projectDescription ||
      !sectorId
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Project'})
    }

    if(
      typeof projectDescription !== 'string' ||
      typeof sectorId !== 'number' 
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Project'})
    }
    
    const lastProjectCode = await this.projectPersistanceRepository.getLastProjectCodeBySector({sectorId})
    if(!lastProjectCode){
      throw new NotFoundError({message: 'No se ha encontrado el último código de los proyectos', core: 'Project'})
    }

    const newProject: ProjectCreateModel = {
      projectDescription,
      projectSectorId: sectorId,
      projectCode: lastProjectCode + 1,
    }
    
    const projectAdded = await this.projectPersistanceRepository.createProject({project: newProject})

    return projectAdded
  }
}