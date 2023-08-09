export const creditRequestPrimaRepositoryMock = {
  listCreditRequestByCampaignId: jest.fn(),
  getNumberOfCreditRequestByFarmer: jest.fn(),
  listCreditRequest: jest.fn(),
  createCreditRequest: jest.fn(),
  getCreditRequestByFarmerId: jest.fn(),
  getCreditRequestById: jest.fn(),
  updateCreditRequestStatusById: jest.fn(),
  listApprovedCreditRequestByFarmerId: jest.fn()
}

export const deliveryPrismaRepositoryMock = {
  listDeliveries: jest.fn(),
  listDeliveriesByCreditRequestId: jest.fn(),
  getTotalAmountByCampaignId: jest.fn(),
  createDelivery: jest.fn(),
  countDeliveriesByCreditRequestId: jest.fn()
}

export const paramMock = {
  creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
  deliveryDatetime: "02/02/2023",
  providerId: 1,
  financialSourceId: 1,
  currentAccountId: 1,
  gloss: "Hola",
  exchangeRate: 3.50
}

export const paramEmptyMock = [
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    //deliveryDatetime: "02/02/2023",
    providerId: 1,
    financialSourceId: 1,
    currentAccountId: 1,
    gloss: "Hola",
    exchangeRate: 3.50
  },
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    deliveryDatetime: "02/02/2023",
    providerId: 1,
    //financialSourceId: 1,
    currentAccountId: 1,
    gloss: "Hola",
    exchangeRate: 3.50
  },
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    deliveryDatetime: "02/02/2023",
    providerId: 1,
    financialSourceId: 1,
    currentAccountId: 1,
    //gloss: "Hola",
    exchangeRate: 3.50
  }
]

export const paramWrongMock = [
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    deliveryDatetime: "02/02/2023",
    providerId: 1,
    financialSourceId: "1",
    currentAccountId: 1,
    gloss: "Hola",
    exchangeRate: 3.50
  },
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    deliveryDatetime: "02/02/2023",
    providerId: 1,
    financialSourceId: 1,
    currentAccountId: "1",
    gloss: "Hola",
    exchangeRate: 3.50
  },
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    deliveryDatetime: "02/02/2023",
    providerId: 1,
    financialSourceId: 1,
    currentAccountId: 1,
    gloss: 5,
    exchangeRate: 3.50
  }
]

export const creditRequestFoundMock = {
  creditRequestId: '87e47b9e-0e1c-4a00-ae20-f305c33d3d57',
  farmerId: '3.1.1',
  farmerFullNames: 'Martin Perez',
  farmerSocialReason: undefined,
  campaignId: 'FRE012023',
  hectareNumber: 4,
  creditReason: 'siembra',
  creditAmount: 4800,
  guaranteeDescription: 'mi casa',
  guaranteeAmount: 9000,
  technicalName: 'Dioses Espinoza Rey Willy',
  assistanceTypeDescription: 'INDEPENDIENTES',
  creditRequestStatus: 'Aprobado',
  creditRequestObservation: 'Prestamo accesible',
  createDateTime: "2023-08-07T08:16:04.978Z",
  updateStatusDateTime: "2023-08-07T08:16:10.865Z"
}

export const deliveriesFoundMock = 0

export const deliveryAddedMock = {
  deliveryId: 1,
  creditRequestId: "fefe-gththjy-jyujy",
  deliveryDatetime: "11/02/2023",
  providerId: 1,
  financialSourceId: 1,
  currentAccountId: 1,
  gloss: 'prueba',
  deliveryAmountUSD: 120,
  deliveryAmountPEN: 30
}
