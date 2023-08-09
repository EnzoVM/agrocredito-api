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
  listAllProjects: jest.fn()
}

export const projectIdMock: number = 5

export const projectFoundMock = {
  projectId: 1,
  projectDescription: 'Prueba',
  projectSectorId: 2,
  projectCode: 1
}

export const farmerCountMock = 0

export const projectDeletedMessageMock = 'El proyecto se ha eliminado correctamente'