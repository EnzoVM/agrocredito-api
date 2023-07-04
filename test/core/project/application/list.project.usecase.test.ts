import ListProjectUseCase from '../../../../src/core/project/application/list.project.usecase'
import Project from '../../../../src/core/project/domain/project.model'
import ProjectPrismaRepository from '../../../../src/core/project/infrastructure/project.prisma.repository'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockProjects: Project[] = [
    {
      projectId: 1,
      projectDescription: 'El Palmar',
      projectSectorId: 2,
      projectCode: 1
    }
  ]

  let projectPrismaRepository: ProjectPrismaRepository
  let listProjectUseCase: ListProjectUseCase

  beforeAll(() => {
    projectPrismaRepository = new ProjectPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(projectPrismaRepository, 'getAllProjects').mockResolvedValue(mockProjects)
    jest.spyOn(projectPrismaRepository, 'getProjectsBySector').mockResolvedValue(mockProjects)

    listProjectUseCase = new ListProjectUseCase(projectPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('List all projects successfully', async () => {
      const projects = await listProjectUseCase.listAll()

      expect(projects.length).toBe(1)
    })

    test('List projects by section successfully', async () => {
      const projects = await listProjectUseCase.listBySector({ sectorId: 1 })

      expect(projects.length).toBe(1)
    })
  })
})
