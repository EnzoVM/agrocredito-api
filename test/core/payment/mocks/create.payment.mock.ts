export const paymentPrismaRepositoryMock = {
  listPayments: jest.fn(),
  getTotalAmountByCampaignId: jest.fn(),
  listPaymentsByCreditRequestId: jest.fn(),
  createPayment: jest.fn()
}

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

export const campaignPrismaRepositoryMock = {
  createCampaign: jest.fn(),
  deleteCampaign: jest.fn(),
  getCampaignByYearAndType: jest.fn(),
  listCampaign: jest.fn(),
  listCampaignById: jest.fn(),
  listCampaignByYear: jest.fn(),
  getCampaignById: jest.fn()
}

export const paramMock = {
  creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
  paymentDateTime: "11/05/2023",
  financialSourceId: 1,
  currentAccountId: 1,
  paymentDescription: "Prueba pago",
  paymentAmountPEN: 6799.99985,
  exchangeRate: 3.50
}

export const paramEmptyMock = [
  {
    //creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    paymentDateTime: "11/05/2023",
    financialSourceId: 1,
    currentAccountId: 1,
    paymentDescription: "Prueba pago",
    paymentAmountPEN: 6799.99985,
    exchangeRate: 3.50
  },
  {
    creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    //paymentDateTime: "11/05/2023",
    financialSourceId: 1,
    currentAccountId: 1,
    paymentDescription: "Prueba pago",
    paymentAmountPEN: 6799.99985,
    exchangeRate: 3.50
  },
  {
    creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    paymentDateTime: "11/05/2023",
    //financialSourceId: 1,
    currentAccountId: 1,
    paymentDescription: "Prueba pago",
    paymentAmountPEN: 6799.99985,
    exchangeRate: 3.50
  }
]

export const paramWrongMock = [
  {
    creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    paymentDateTime: "11/05/2023",
    financialSourceId: "1",  // must be a number
    currentAccountId: 1,
    paymentDescription: "Prueba pago",
    paymentAmountPEN: 6799.99985,
    exchangeRate: 3.50
  },
  {
    creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    paymentDateTime: "11/05/2023",
    financialSourceId: 1,
    currentAccountId: "1", // must be a number
    paymentDescription: "Prueba pago",
    paymentAmountPEN: 6799.99985,
    exchangeRate: 3.50
  },
  {
    creditRequestId: "87e47b9e-0e1c-4a00-ae20-f305c33d3d57",
    paymentDateTime: "11/05/2023",
    financialSourceId: 1,
    currentAccountId: 1,
    paymentDescription: 3,  // must be a string
    paymentAmountPEN: 6799.99985,
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

export const campaignFoundMock = {
  campaignId: 'FRE012023',
  campaignDescription: '2023-1',
  campaignTypeId: 2,
  campaignYear: '2023',
  periodName: 'Periodo 1',
  startDate: '01/08',
  finishDate: '26/08',
  campaignInterest: 25,
  campaignDelinquentInterest: 30
}

export const paymentFoundMock = [
  {
    paymentId: 14,
    fullNames: 'Martin Perez',
    socialReason: undefined,
    paymentDateTime: "2023-11-05T05:00:00.000Z",
    financialSourceDescription: 'Recuperaciones M.E.',
    currentAccountDescription: '007251-1-32',
    paymentDescription: 'Prueba pago',
    paymentAmount: 2857.1429
  },
  {
    paymentId: 15,
    fullNames: 'Martin Perez',
    socialReason: undefined,
    paymentDateTime: "2023-11-05T05:00:00.000Z",
    financialSourceDescription: 'Recuperaciones M.E.',
    currentAccountDescription: '007251-1-32',
    paymentDescription: 'Prueba pago',
    paymentAmount: 1942.8571
  }
]

export const paymentAddedMock = {
  paymentId: 16,
  creditRequestId: '87e47b9e-0e1c-4a00-ae20-f305c33d3d57',
  paymentDateTime: 'Sun Nov 05 2023 00:00:00 GMT-0500 (Peru Standard Time)',
  financialSourceId: 1,
  currentAccountId: 1,
  paymentDescription: 'Prueba pago',
  paymentAmountUSD: 571.4286,
  paymentAmountPEN: 2000
}
