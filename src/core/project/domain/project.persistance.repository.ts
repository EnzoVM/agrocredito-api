import ProjectCreateModel from "./project.create.model"
import ProjectListModel from "./project.list.model"
import Project from "./project.model"

export default interface ProjectPersistanceRepository {
  getAllProjects: () => Promise<Project[]>
  getProjectsBySector: ({ sectorId }: { sectorId: number }) => Promise<Project[]>
  deleteProjectById: ({projectId}:{projectId: number}) => Promise<string>
  getProjectById: ({projectId}:{projectId: number}) => Promise<Project | null>
  listProjectsBySector: ({sectorId}:{sectorId: number}) => Promise<{projects: ProjectListModel[], count: number}>
  listProjectsByName: ({projectDescription}:{projectDescription: string}) => Promise<{projects: ProjectListModel[], count: number}>
  listProjectsBySectorAndName: ({sectorId, projectDescription}:{sectorId: number, projectDescription: string}) => Promise<{projects: ProjectListModel[], count: number}>
  listAllProjects: () => Promise<{projects: ProjectListModel[], count: number}>
  getLastProjectCodeBySector: ({sectorId}:{sectorId: number}) => Promise<number | null>
  createProject: ({project}:{project: ProjectCreateModel}) => Promise<Project>
}