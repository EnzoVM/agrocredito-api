export const departureDetailPrismaRepositoryMock = {
  createDepartureDetail: jest.fn(),
  listDepartureDetail: jest.fn(),
  deleteDepartureDetail: jest.fn(),
  getTotalNumberOfDepartureDetail: jest.fn()
}

export const departureDetailIdMock = 1

export const departureDetailMessageDeletedMock = {
  departureDetailId: 1,
  deliveryPlanModelId: 1,
  departureDetailDescription: "Descripion de partida",
  departureType: "Indirecta",
  resource: "Efectivo",
  amountPerHectare: 1000.2
}