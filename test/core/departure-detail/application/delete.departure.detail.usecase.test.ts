import DeleteDepartureDetailUseCase from '../../../../src/core/departure-detail/application/delete.departure.detail.usecase'
import { 
  departureDetailPrismaRepositoryMock,
  departureDetailMessageDeletedMock,
  departureDetailIdMock 
} from '../mocks/delete.departure.detail.usecase.mock'

const deleteDepartureDetailUseCase = new DeleteDepartureDetailUseCase(departureDetailPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should delete a departure detail successfully', async () => {
    departureDetailPrismaRepositoryMock.deleteDepartureDetail.mockResolvedValue(departureDetailMessageDeletedMock)
    const departureDetailMessageDeleted = await deleteDepartureDetailUseCase.invoke({ departureDetailId: departureDetailIdMock})
    
    expect(departureDetailMessageDeleted).toStrictEqual(departureDetailMessageDeletedMock)
  })
})