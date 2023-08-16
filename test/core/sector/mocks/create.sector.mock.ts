export const sectorPrismaRepositoryMock = {
  listAllSectors: jest.fn(),
  listSectorsByName: jest.fn(),
  createSector: jest.fn(),
  deleteSectorById: jest.fn()
}

export const paramMock = {
  sectorDescription: 'PruebaMock'
}

export const sectorAddedMock = {
  sectorId: 5,
  sectorDescription: 'PruebaMock'
}

export const paramMockWrong = {
  sectorDescription: 5  // MUST BE A STRING
}

export const paramMockEmpty = {
  //sectorDescription: 'PruebaMock'
}