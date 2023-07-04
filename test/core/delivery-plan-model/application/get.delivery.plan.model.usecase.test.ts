import GetDeliveryPlanModelUseCase from '../../../../src/core/delivery-plan-model/application/get.delivery.plan.model.usecase'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'

import {
  deliveryPlanModelPrismaRepositoryMock,
  deliveryPlanModelFoundMock, 
  campaignIdMock,
  errorMessage
} from '../mocks/get.delivery.plan.model.usecase.mock'

const getDeliveryPlanModelUseCase = new GetDeliveryPlanModelUseCase(deliveryPlanModelPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a object with delivery plan model by campaign', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelByCampaignId.mockResolvedValue(deliveryPlanModelFoundMock)
    const deliveryPlanModelFound = await getDeliveryPlanModelUseCase.invoke({campaignId: campaignIdMock})
    
    expect(deliveryPlanModelFound).toEqual(deliveryPlanModelFoundMock)
  })
})

describe('PROCESS ERROR', () => {
  test('Should throw an error when not found a delivery plan model for this campaign', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelByCampaignId.mockResolvedValue(null)

    await expect(getDeliveryPlanModelUseCase.invoke({campaignId: campaignIdMock})).rejects.toThrowError(errorMessage)
    await expect(getDeliveryPlanModelUseCase.invoke({campaignId: campaignIdMock})).rejects.toBeInstanceOf(ProcessError)
  })
})