import DepartureDetailList from '../../../../src/core/departure-detail/domain/departure.detail.list.model'
import CreditRequestCreate from '../../../../src/core/credit-request/domain/credit.request.create.model'
import {FarmerDetail} from '../../../../src/core/farmer/domain/farmer.detail.model'

export const creditRequestPrimaRepositoryMock = {
  listCreditRequestByCampaignId: jest.fn(),
  getNumberOfCreditRequestByFarmer: jest.fn(),
  listCreditRequest: jest.fn(),
  createCreditRequest: jest.fn(),
  getCreditRequestByFarmerId: jest.fn()
}

export const creditRequestUuidRepositoryMock = {
  generateCreditRequestId: jest.fn()
}

export const departureDetailPrismaRepositoryMock = {
  createDepartureDetail: jest.fn(),
  listDepartureDetail: jest.fn(),
  deleteDepartureDetail: jest.fn(),
  getDepartureDetailByCampaignId: jest.fn()
}

export const farmerPrismaRepositoryMock = {
  createFarmer: jest.fn(),
  getFarmerAttributes: jest.fn(),
  getLastFarmerCorrelative: jest.fn(),
  getFarmersByIncludeId: jest.fn(),
  getFarmersByFullNames: jest.fn(),
  getFarmersBySocialReason: jest.fn(),
  updateFarmerById: jest.fn(),
  getFarmerById: jest.fn(),
  getFarmerByDNI: jest.fn(),
  getFarmerByRUC: jest.fn(),
  deleteFarmerById: jest.fn(),
}

export const departureDetailFoundMock: DepartureDetailList[] = [
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Mock',
    departureType: 'Individual',
    resource: 'Efectivo',
    amountPerHectare: 10
  },
  {
    departureDetailId: 1,
    deliveryPlanModelId: 1,
    departureDetailDescription: 'Mock',
    departureType: 'Individual',
    resource: 'Efectivo',
    amountPerHectare: 10
  }
]

export const creditRequestFoundMock: CreditRequestCreate[] = [
  {
    creditRequestId: "c30a928d-e352-4281-a8d8-b1e115dd298b",
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestStatus: "Pendiente",
    creditRequestObservation: "test v3"
  }
]

export const farmerFoundMock: FarmerDetail = {
  farmerId: '4.2.1',
  propertySector: 'Tumbes',
  propertyProject: 'Higuerón',
  correlative: 1,
  farmerQuality: 'Bueno',
  farmerType: 'Individual',
  socialReason: undefined,
  fullNames: 'Gean Pieer Genaro Lopez Sevallos',
  dni: '87654321',
  ruc: undefined,
  propertyLocation: 'Panamericana sur',
  propertyLegalCondition: 'Titulado',
  cadastralRegistry: '374847984793WW',
  farmerAddress: 'Av. Tumbes 2034',
  farmerProject: 'Tumbes',
  propertyHectareQuantity: 10
}

export const creditRequestIdMock: string = 'c30a928d-e352-4281-a8d8-b1e115dd298b'


export const creditRequestCreatedMock: CreditRequestCreate = {
  creditRequestId: "c30a928d-e352-4281-a8d8-b1e115dd298b",
  farmerId: "4.2.1",
  campaignId: "ARR012023",
  hectareNumber: 5,
  creditReason: "test",
  creditAmount: 2000,
  guaranteeDescription: "test v2",
  guaranteeAmount: 5000,
  technicalId: 1,
  creditRequestStatus: "Pendiente",
  creditRequestObservation: "test v3"
}

export const parameterMock = {
  farmerId: "4.2.1",
  campaignId: "ARR012023",
  hectareNumber: 5,
  creditReason: "test",
  creditAmount: 2000,
  guaranteeDescription: "test v2",
  guaranteeAmount: 5000,
  technicalId: 1,
  creditRequestObservation: "test v3"
}

export const parameterMockWithMoreHectare = {
  farmerId: "4.2.1",
  campaignId: "ARR012023",
  hectareNumber: 7,
  creditReason: "test",
  creditAmount: 2000,
  guaranteeDescription: "test v2",
  guaranteeAmount: 5000,
  technicalId: 1,
  creditRequestObservation: "test v3"
}

export const parameterEmptyMock = [
  {
    
  },
  {
    //farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    //campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    //hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    //creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    //creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    //guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    //guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    //technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    //creditRequestObservation: "test v3"
  }
]

export const parameterWrongMock = [
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: 5,  //must be a string
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestObservation: "test v3"
  },
  {
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: "5000",  //must be a number
    technicalId: 1,
    creditRequestObservation: "test v3"
  }
]
