export const farmerPrismaRepositoryMock = {
  createFarmer: jest.fn(),
  getFarmerAttributes: jest.fn(),
  getLastFarmerCorrelative: jest.fn(),
  getFarmersByIncludeId: jest.fn(),
  getFarmersByFullNames: jest.fn(),
  getFarmersBySocialReason: jest.fn(),
  updateFarmerById: jest.fn(),
  getFarmerById: jest.fn(),
  getFarmerByDNI: jest.fn(),
  getFarmerByRUC: jest.fn(),
  deleteFarmerById: jest.fn(),
  countFarmerMatchToProject: jest.fn()
}

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

export const projectIdMock = {
  projectId: 5
}

export const projectIdMockWrong = {
  projectId: 'grgrg'    // must be a number
}

export const projectIdMockEmpty = {
  //projectId: 'grgrg'
}

export const projectFoundMock = {
  projectId: 1,
  projectDescription: 'Prueba',
  projectSectorId: 2,
  projectCode: 1
}

export const farmerCountMock = 0

export const projectDeletedMessageMock = 'El proyecto se ha eliminado correctamente'