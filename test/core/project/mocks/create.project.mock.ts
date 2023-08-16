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

export const paramMock = {
  projectDescription: 'Prueba',
  sectorId: 4
}

export const paramMockWrong = [
  {
    projectDescription: 4, // must be a string
    sectorId: 4
  },
  {
    projectDescription: 'Prueba',
    sectorId: 'vevrvrvr'  // must be a number
  }
]

export const paramMockEmpty = [
  {
    //projectDescription: 'Prueba',
    sectorId: 4
  },
  {
    projectDescription: 'Prueba',
    //sectorId: 4
  }
]

export const lastProjectCodeMock = 20

export const projectAddedMock = {
  projectId: 32,
  projectCode: 21,
  projectDescription: "Prueba",
  projectSectorId: 4
}