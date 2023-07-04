export const deliveryPlanModelPrismaRepositoryMock = {
  createDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelByCampaignId: jest.fn(),
  deleteDeliveryPlanModel: jest.fn(),
  getTotalNumberOfDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelById: jest.fn()
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

export const campaignFoundMock = {
  campaignId: 'ARR012023',
  campaignDescription: 'Arroz 2023',
  campaignTypeId: 1,
  campaignYear: '2023',
  periodName: 'Periodo 1',
  startDate: '02/10',
  finishDate: '03/11'
}


export const parametersMock = {
  campaignId: 'ARR012020',
  deliveryPlanModelDescription: 'Descripcion de prueba'  
}

export const parameterIncorrectMock = [
  {

  },
  {
    //campaignId: 'ARR012020',
    deliveryPlanModelDescription: 'Descripcion de prueba'  
  },
  {
    campaignId: 'ARR012020',
    //deliveryPlanModelDescription: 'Descripcion de prueba'  
  },
  {
    campaignId: 1,
    deliveryPlanModelDescription: 'Descripcion de prueba'  
  },
  {
    campaignId: 'ARR012020',
    deliveryPlanModelDescription: 1 
  }
]

export const deliveryPlanModelFoundMock = {
  deliveryPlanModelId: 1,
  campaignId: 'ARR012020',
  deliveryPlanModelDescription: 'Descripcion mock'
}

export const deliveryPlanModelIdMock = 2

export const deliveryPlanModelCreatedMock = {
  deliveryPlanModelId: 3,
  campaignId: 'ARR012020',
  deliveryPlanModelDescription: 'Descripcion de prueba'
}

export const errorMessageProcessErrorMock = 'You can only create 1 delivery plan template per campaign'

export const errorMessageBadRequestErrorMock = 'Body of the request are null or invalid'

export const errorMessageBadRequestErrorMock2 = 'There is no campaign'