export const sectorPrismaRepositoryMock = {
  listAllSectors: jest.fn(),
  listSectorsByName: jest.fn(),
  createSector: jest.fn(),
  deleteSectorById: jest.fn()
}

export const paramMock = {
  sectorDescription: 'prueb', 
  page: 1, 
  limit: 10, 
}

export const paramMockWrong = [
  {
    sectorDescription: 'prueb', 
    page: "mock",  // must be a number
    limit: 10, 
  },
  {
    sectorDescription: 'prueb', 
    page: 1, 
    limit: "ttt",   // must be a number
  }
]

export const paramMockEmpty = [
  {
    sectorDescription: 'prueb', 
    //page: 1, 
    limit: 10,  
  },
  {
    sectorDescription: 'prueb', 
    page: 1, 
    //limit: 10, 
  }
]

export const response = {
  sectors: [
    {
      sectorId: 2,
      sectorDescription: "Margen izquierda"
    },
    {
      sectorId: 3,
      sectorDescription: "Tumbes"
    },
    {
      sectorId: 4,
      sectorDescription: "Margen derecha"
    }
  ],
  count: 3
}


