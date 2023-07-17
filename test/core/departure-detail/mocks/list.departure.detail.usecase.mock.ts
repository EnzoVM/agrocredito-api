export const departureDetailPrismaRepositoryMock = {
  createDepartureDetail: jest.fn(),
  listDepartureDetail: jest.fn(),
  deleteDepartureDetail: jest.fn(),
  getDepartureDetailByCampaignId: jest.fn()
}

export const deliveryPlanModelIdMock = 1

export const departureDetailListMock = [
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: "Descripion de partida",
    departureType: "Indirecta",
    resource: "Efectivo",
    amountPerHectare: 2000.2
  },
  {
    departureDetailId: 2,
    deliveryPlanModelId: 1,
    departureDetailDescription: "Descripion de partida",
    departureType: "Indirecta",
    resource: "Efectivo",
    amountPerHectare: 2000.2
  }
]