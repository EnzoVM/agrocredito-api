export const departureDetailPrismaRepositoryMock = {
  createDepartureDetail: jest.fn(),
  listDepartureDetail: jest.fn(),
  deleteDepartureDetail: jest.fn(),
  getDepartureDetailByCampaignId: jest.fn()
}

export const campaignIdMock = 'ARR012023'

export const departureDetailFoundMock = [
  {
      departureDetailId: 1,
      deliveryPlanModelId: 1,
      departureDetailDescription: "Descripion de partida",
      departureType: "Indirecta",
      resource: "Efectivo",
      amountPerHectare: 1000.2
  },
  {
      departureDetailId: 2,
      deliveryPlanModelId: 1,
      departureDetailDescription: "gg",
      departureType: "grgr",
      resource: "Efectivo",
      amountPerHectare: 80
  }
]