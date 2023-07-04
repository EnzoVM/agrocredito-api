import ListDepartureDetailUseCase from '../../../../src/core/departure-detail/application/list.departure.detail.usecase'
import {
  departureDetailPrismaRepositoryMock,
  deliveryPlanModelIdMock,
  departureDetailListMock
} from '../mocks/list.departure.detail.usecase.mock'

const listDepartureDetailUseCase = new ListDepartureDetailUseCase(departureDetailPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should list departure details successfully', async () => {
    departureDetailPrismaRepositoryMock.listDepartureDetail.mockResolvedValue(departureDetailListMock)
    const departureDetailList = await listDepartureDetailUseCase.invoke({ deliveryPlanModelId: deliveryPlanModelIdMock})
    
    expect(departureDetailList).toEqual(departureDetailListMock)
  })
})