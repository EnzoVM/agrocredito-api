import ListProviderUseCase from '../../../../src/core/provider/application/list.provider.usecase'
import { 
  providerPrismaRepositoryMock,
  listProvidersMock
} from '../mocks/list.provider.mock'

const listProviderUseCase = new ListProviderUseCase(providerPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of provides', async () => {
    providerPrismaRepositoryMock.listProviders.mockResolvedValue(listProvidersMock)

    const listProviders = await listProviderUseCase.invoke()
    
    expect(listProviders).toEqual(listProvidersMock)
  })

  test('Should return an empty array', async () => {
    providerPrismaRepositoryMock.listProviders.mockResolvedValue([])

    const listProviders = await listProviderUseCase.invoke()
    
    expect(listProviders).toEqual([])
  })
})