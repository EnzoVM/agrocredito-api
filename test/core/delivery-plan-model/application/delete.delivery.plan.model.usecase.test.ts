import DeleteDeliveryPlanModelUseCase from '../../../../src/core/delivery-plan-model/application/delete.delivery.plan.model.usecase'
import {
  deliveryPlanModelPrismaRepositoryMock,
  deliveryPlanModelIdMock, 
  deliveryPlanModelMessageDeletedMock 
} from '../mocks/delete.delivery.plan.model.usecase.mock'

const deleteDeliveryPlanModelUseCase = new DeleteDeliveryPlanModelUseCase(deliveryPlanModelPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should delete a delivery plan model successfully', async () => {
    deliveryPlanModelPrismaRepositoryMock.deleteDeliveryPlanModel.mockResolvedValue(deliveryPlanModelMessageDeletedMock)
    const deliveryPlanModelDeleted = await deleteDeliveryPlanModelUseCase.invoke({ deliveryPlanModelId: deliveryPlanModelIdMock})
    
    expect(deliveryPlanModelDeleted).toEqual(deliveryPlanModelMessageDeletedMock)
  })
})

