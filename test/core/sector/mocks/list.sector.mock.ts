export const sectorPrismaRepositoryMock = {
  listAllSectors: jest.fn(),
  listSectorsByName: jest.fn(),
  createSector: jest.fn(),
  deleteSectorById: jest.fn()
}

export const sectorListMock = {
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
  count: 5
}

export const sectorListMockResponse = [
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
]