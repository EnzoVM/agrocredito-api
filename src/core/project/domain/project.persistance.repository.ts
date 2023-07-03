import Project from "./project.model"

export default interface ProjectPersistanceRepository {
  getAllProjects: () => Promise<Project[]>
  getProjectsBySector: ({ sectorId }: { sectorId: number }) => Promise<Project[]>
}