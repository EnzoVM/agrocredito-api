export const departureDetailPrismaRepositoryMock = {
  createDepartureDetail: jest.fn(),
  listDepartureDetail: jest.fn(),
  deleteDepartureDetail: jest.fn(),
  getTotalNumberOfDepartureDetail: jest.fn()
}

export const deliveryPlanModelPrismaRepositoryMock = {
  createDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelByCampaignId: jest.fn(),
  deleteDeliveryPlanModel: jest.fn(),
  getTotalNumberOfDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelById: jest.fn()
}

export const deliveryPlanModelFoundMock = {
  deliveryPlanModelId: 1,
  campaignId: 'ARR012020',
  deliveryPlanModelDescription: 'Descripcion mock'
}

export const parametersMock = {
  deliveryPlanModelId: 1,
  departureDetailDescription: 'Descripcion de Prueba',
  departureType: 'Indirecta',
  amountPerHectare: 1950,
}

export const parameterIncorrectMock = [
  {

  },
  {
    //deliveryPlanModelId: 1,
    departureDetailDescription: 'Descripcion de Prueba',
    departureType: 'Indirecta',
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    //departureDetailDescription: 'Descripcion de Prueba',
    departureType: 'Indirecta',
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Descripcion de Prueba',
    //departureType: 'Indirecta',
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Descripcion de Prueba',
    departureType: 'Indirecta',
    //amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: '1',     //must be a number
    departureDetailDescription: 'Descripcion de Prueba',
    departureType: 'Indirecta',
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    departureDetailDescription: 2, //must be a string
    departureType: 'Indirecta',
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Descripcion de Prueba',
    departureType: 1,             //must be a string
    amountPerHectare: 1950,
  },
  {
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Descripcion de Prueba',
    departureType: 'Indirecta',
    amountPerHectare: '1950',     //must be a number
  }
]

export const departureDetailsFoundNothingMock = []

export const departureDetailsFoundOneMock = [
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: "Descripion de partida",
    departureType: "Indirecta",
    resource: "Efectivo",
    amountPerHectare: 2000.2
  }
]

export const departureDetailsFoundTwoMock = [
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: "Descripion de partida",
    departureType: "Indirecta",
    resource: "Efectivo",
    amountPerHectare: 2000.2
  },
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: "Descripion de partida",
    departureType: "Indirecta",
    resource: "Efectivo",
    amountPerHectare: 2000.2
  }
]


export const departureDetailId = 2

export const departureDetailCreated = {
  departureDetailId: 3,
  deliveryPlanModelId: 1,
  departureDetailDescription: "Descripion de partida",
  departureType: "Indirecta",
  resource: "Efectivo",
  amountPerHectare: 2000.2
}

export const errorMessageProcessErrorMock = 'Only 2 line item details can be created per delivery plan model'

export const errorMessageBadRequestErrorMock = 'Body of the request are null or invalid'

export const errorMessageBadRequestError2Mock = 'There is no delivery plan model'
