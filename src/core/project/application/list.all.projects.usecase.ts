import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProjectListModel from "../domain/project.list.model"
import ProjectPersistanceRepository from "../domain/project.persistance.repository"

export default class ListAllProjectsUseCase {
  
  constructor(
    private readonly projectPersistanceRepository: ProjectPersistanceRepository
  ) {}

  async invoke ({
    sectorId, 
    projectDescription, 
    page, 
    limit, 
    typeSearch
  }:{
    sectorId?: number, 
    projectDescription?: string, 
    page: number, 
    limit: number, 
    typeSearch: 'all' | 'sector' | 'name' | 'both'
  }): Promise<{projectList: ProjectListModel[], count: number}> {
    
    if(
      !page ||
      !limit ||
      !typeSearch
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Project'})
    }

    if(
      typeof page !== 'number' ||
      typeof limit !== 'number' 
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Project'})
    }

    if(
      typeSearch !== 'all' &&
      typeSearch !== 'sector' &&
      typeSearch !== 'name' &&
      typeSearch !== 'both' 
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Project'})
    }
    
    let projectList: ProjectListModel[] = []
    let projectCount: number = 0
    
    if(typeSearch === 'all'){
      const {projects, count} = await this.projectPersistanceRepository.listAllProjects()
      projectList = projects
      projectCount = count
    }
    
    if(typeSearch === 'sector'){
      if(!sectorId){
        throw new BadRequestError({ message: 'Se tiene que especificar el sector', core: 'Project'})
      }
      const {projects, count} = await this.projectPersistanceRepository.listProjectsBySector({sectorId})
      projectList = projects
      projectCount = count
    }

    if(typeSearch === 'name'){
      if(!projectDescription){
        throw new BadRequestError({ message: 'Se tiene que especificar el nombre del proyecto', core: 'Project'})
      }
      const {projects, count} = await this.projectPersistanceRepository.listProjectsByName({projectDescription})
      projectList = projects
      projectCount = count
    }

    if(typeSearch === 'both'){
      if(!projectDescription || !sectorId){
        throw new BadRequestError({ message: 'Se tiene que especificar el nombre del proyecto y el sector', core: 'Project'})
      }
      const {projects, count} = await this.projectPersistanceRepository.listProjectsBySectorAndName({sectorId, projectDescription})
      projectList = projects
      projectCount = count
    }
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const listProjects = projectList.slice(startIndex, endIndex)

    return {
      projectList: listProjects,
      count: projectCount
    }
  }
}