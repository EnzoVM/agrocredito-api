import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import Project from "../domain/project.model"
import ProjectPersistanceRepository from "../domain/project.persistance.repository"

const prisma = new PrismaConnection().connection

export default class ProjectPrismaRepository implements ProjectPersistanceRepository {
  async getAllProjects (): Promise<Project[]> {
    try {
      const projectsFound = await prisma.project.findMany()
      return projectsFound.map(projectFound => {
        return {
          projectId: projectFound.project_id,
          projectDescription: projectFound.project_description,
          projectSectorId: projectFound.sector_id,
          projectCode: projectFound.code
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project' })
    }
  }

  async getProjectsBySector ({ sectorId }: { sectorId: number }): Promise<Project[]> {
    try {
      const projectsFound = await prisma.project.findMany({
        where: {
          sector_id: sectorId
        }
      })

      return projectsFound.map(projectFound => {
        return {
          projectId: projectFound.project_id,
          projectDescription: projectFound.project_description,
          projectSectorId: projectFound.sector_id,
          projectCode: projectFound.code
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project' })
    }
  }

}