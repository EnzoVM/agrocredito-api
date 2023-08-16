export const projectPrismaRepositoryMock = {
  getAllProjects: jest.fn(),
  getProjectsBySector: jest.fn(),
  getProjectById: jest.fn(),
  deleteProjectById: jest.fn(),
  listProjectsBySector: jest.fn(),
  listProjectsByName: jest.fn(),
  listProjectsBySectorAndName: jest.fn(),
  listAllProjects: jest.fn(),
  getLastProjectCodeBySector: jest.fn(),
  createProject: jest.fn()
}

export const sectorPrismaRepositoryMock = {
  listAllSectors: jest.fn(),
  listSectorsByName: jest.fn(),
  createSector: jest.fn(),
  deleteSectorById: jest.fn()
}

export const paramMock = {
  sectorId: 5
}

export const paramMockWrong = {
  sectorId: 'Hola'  // must be a number
}

export const paramMockEmpty = {
  // sectorId: 5
}

export const projectFoundMock = [
  {
    projectId: 1,
    projectDescription: 'Prueba',
    projectSectorId: 5,
    projectCode: 5
  },
  {
    projectId: 1,
    projectDescription: 'Prueba',
    projectSectorId: 5,
    projectCode: 5
  }
]

export const sectorDeletedMessageMock = 'El sector ha sido eliminado correctamente'