import Project from "../domain/project.model"
import ProjectPersistanceRepository from "../domain/project.persistance.repository"

export default class ListProjectUseCase {
  constructor (private readonly projectPersistanceRepository: ProjectPersistanceRepository) {}

  async listAll (): Promise<Project[]> {
    const projectsFound = await this.projectPersistanceRepository.getAllProjects()
    return projectsFound
  }

  async listBySector ({ sectorId }: { sectorId: number }): Promise<Project[]> {
    const projectsFound = await this.projectPersistanceRepository.getProjectsBySector({ sectorId })
    return projectsFound
  }
}