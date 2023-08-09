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

export const paramEmptyMock = [
  {
    sectorId: 1, 
    projectDescription: 'Prueba', 
    //page: 1, 
    limit: 5
  },
  {
    sectorId: 1, 
    projectDescription: 'Prueba', 
    page: 1, 
    //limit: 5
  }
]

export const paramsWrong = [
  {
    sectorId: 1, 
    projectDescription: 'Prueba', 
    page: 'Hola', 
    limit: 5
  },
  {
    sectorId: 1, 
    projectDescription: 'Prueba', 
    page: 1, 
    limit: 'Hola'
  }
]

export const paramMock = {
  sectorId: 1,
  projectDescription: 'T',
  page: 1, 
  limit: 5
}

export const response = {
  projects: [
      {
          projectId: 1,
          projectDescription: "El Palmar",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 2,
          projectDescription: "Cooperativa 20 de Enero",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 3,
          projectDescription: "Romero",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 4,
          projectDescription: "La Tuna",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 5,
          projectDescription: "Puerto El Cura",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 6,
          projectDescription: "Las Brujas Alta",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 7,
          projectDescription: "Las Brujas Baja",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 8,
          projectDescription: "Becerra Belén",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 9,
          projectDescription: "Coop. Ntra. Sra. del Carmen",
          sectorDescription: "Margen izquierda"
      },
      {
          projectId: 10,
          projectDescription: "Bebedero",
          sectorDescription: "Margen izquierda"
      }
  ],
  count: 11
}