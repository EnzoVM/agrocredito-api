import ListCurrentAccountUseCase from '../../../../src/core/current-account/application/list.current.account.usecase'
import { 
  currentAccountPrismaRepositoryMock,
  listCurrentAccountMock 
} from '../mocks/list.current.account.mock'

const listCurrentAccountUseCase = new ListCurrentAccountUseCase(currentAccountPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of current account', async () => {
    currentAccountPrismaRepositoryMock.listCurrentAcount.mockResolvedValue(listCurrentAccountMock)

    const listCurrentAccount = await listCurrentAccountUseCase.invoke()
    
    expect(listCurrentAccount).toEqual(listCurrentAccountMock)
  })

  test('Should return an empty array', async () => {
    currentAccountPrismaRepositoryMock.listCurrentAcount.mockResolvedValue([])

    const listCurrentAccount = await listCurrentAccountUseCase.invoke()
    
    expect(listCurrentAccount).toEqual([])
  })
})