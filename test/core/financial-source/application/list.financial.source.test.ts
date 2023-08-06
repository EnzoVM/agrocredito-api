import ListFinancialSourceUseCase from '../../../../src/core/financial-source/application/list.financial.source.usecase'
import { 
  financialSourcePrismaRepositoryMock,
  listFinancialSourcesMock
} from '../mocks/list.financial.source.mock'

const listFinancialSourceUseCase = new ListFinancialSourceUseCase(financialSourcePrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of financial source', async () => {
    financialSourcePrismaRepositoryMock.listFinancialSources.mockResolvedValue(listFinancialSourcesMock)

    const listFinancialSources = await listFinancialSourceUseCase.invoke()
    
    expect(listFinancialSources).toEqual(listFinancialSourcesMock)
  })

  test('Should return an empty array', async () => {
    financialSourcePrismaRepositoryMock.listFinancialSources.mockResolvedValue([])

    const listFinancialSources = await listFinancialSourceUseCase.invoke()
    
    expect(listFinancialSources).toEqual([])
  })
})