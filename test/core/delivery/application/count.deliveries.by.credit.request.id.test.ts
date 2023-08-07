import CountDeliveriesByCreditRequestIdUseCase from '../../../../src/core/delivery/application/count.deliveries.by.credit.request.id.usecase'
import { 
  deliveryPrismaRepositoryMock,
  creditRequestIdMock,
  deliveriesCountMock
} from '../mocks/count.deliveries.by.credit.request.id.mock'

const countDeliveriesByCreditRequestIdUseCase = new CountDeliveriesByCreditRequestIdUseCase(deliveryPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a number', async () => {
    deliveryPrismaRepositoryMock.countDeliveriesByCreditRequestId.mockResolvedValue(deliveriesCountMock)

    const deliveriesCount = await countDeliveriesByCreditRequestIdUseCase.invoke({creditRequestId: creditRequestIdMock})
    
    expect(deliveriesCount).toEqual(deliveriesCountMock)
  })
})