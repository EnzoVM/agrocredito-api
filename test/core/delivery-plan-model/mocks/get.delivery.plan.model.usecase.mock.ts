export const deliveryPlanModelPrismaRepositoryMock = {
  createDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelByCampaignId: jest.fn(),
  deleteDeliveryPlanModel: jest.fn(),
  getTotalNumberOfDeliveryPlanModel: jest.fn(),
  getDeliveryPlanModelById: jest.fn()
}

export const campaignIdMock = 'ARR012020'

export const deliveryPlanModelFoundMock = {
  deliveryPlanModelId: 1,
  campaignId: 'ARR012020',
  deliveryPlanModelDescription: 'Descripcion mock'
}

export const errorMessage = 'There is no delivery plan template assigned to this campaign'
