export const deliveryPrismaRepositoryMock = {
  listDeliveries: jest.fn(),
  listDeliveriesByCreditRequestId: jest.fn(),
  createDelivery: jest.fn(),
  countDeliveriesByCreditRequestId: jest.fn()
}

export const deliveriesCountMock = 2

export const creditRequestIdMock='5rgrgrg-3hntjy-dswd'
