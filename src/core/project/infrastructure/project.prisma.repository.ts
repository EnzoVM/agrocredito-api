import PrismaConnection from "../../../prisma/prisma.connection"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error"
import ProjectListModel from "../domain/project.list.model"
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
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }

  async getProjectById ({ projectId }: { projectId: number }): Promise<Project | null> {
    try {
      const projectFound = await prisma.project.findUnique({
        where: {
          project_id: projectId
        }
      })

      if(!projectFound) {return null}

      return {
        projectId: projectFound.project_id,
        projectDescription: projectFound.project_description,
        projectSectorId: projectFound.sector_id,
        projectCode: projectFound.code
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }

  async deleteProjectById ({ projectId }: { projectId: number }): Promise<string> {
    try {      
      const projectDeleted = await prisma.project.delete({
        where: {
          project_id: projectId
        }
      })

      return `The Project ${projectDeleted.project_description} was deleted`
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }

  async listProjectsBySector ({ sectorId }: { sectorId: number }): Promise<{projects: ProjectListModel[], count: number}> {
    try {      
      const projectList = await prisma.project.findMany({
        where: {
          sector_id: sectorId
        },
        include: {
          sector: true
        },
        orderBy: {
          project_id: "asc"
        }
      })

      const count: number = projectList.length

      return {
        projects: projectList.map(project => {
          return {
            projectId: project.project_id,
            projectDescription: project.project_description,
            sectorDescription: project.sector.sector_description
          }
        }),
        count
      }
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }

  async listProjectsByName ({ projectDescription }: { projectDescription: string }): Promise<{projects: ProjectListModel[], count: number}> {
    try {
      const projectList = await prisma.project.findMany({
        where: {
          project_description: {
            contains: projectDescription
          }
        },
        include: {
          sector: true
        },
        orderBy: {
          project_id: "asc"
        }
      })
      
      const count: number = projectList.length
      
      return {
        projects: projectList.map(project => {
          return {
            projectId: project.project_id,
            projectDescription: project.project_description,
            sectorDescription: project.sector.sector_description
          }
        }),
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }

  async listProjectsBySectorAndName ({ 
    sectorId, 
    projectDescription 
  }:{ 
    sectorId: number; 
    projectDescription: string 
  }): Promise<{projects: ProjectListModel[], count: number}> {
    try {
      const projectList = await prisma.project.findMany({
        where: {
          AND: {
            project_description: {
              contains: projectDescription
            },
            sector_id: sectorId
          }
        },
        include: {
          sector: true
        },
        orderBy: {
          project_id: "asc"
        }
      })

      const count: number = projectList.length
      
      return {
        projects: projectList.map(project => {
          return {
            projectId: project.project_id,
            projectDescription: project.project_description,
            sectorDescription: project.sector.sector_description
          }
        }),
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }
  
  async listAllProjects (): Promise<{projects: ProjectListModel[], count: number}> {
    try {
      const projectList = await prisma.project.findMany({
        include: {
          sector: true
        }
      })

      const count: number = projectList.length
      
      return {
        projects: projectList.map(project => {
          return {
            projectId: project.project_id,
            projectDescription: project.project_description,
            sectorDescription: project.sector.sector_description
          }
        }),
        count
      }
      
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'project'})
    }
  }
}