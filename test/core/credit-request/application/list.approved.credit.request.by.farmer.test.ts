import ListApprovedCreditRequestByFarmerUseCase from '../../../../src/core/credit-request/application/list.approved.credit.request.by.farmer.usecase'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import { 
  creditRequestPrimaRepositoryMock,
  creditRequestFoundMock,
  farmerIdMock
} from '../mocks/list.approved.credit.request.by.farmer.mock'

const listApprovedCreditRequestByFarmerUseCase = new ListApprovedCreditRequestByFarmerUseCase(creditRequestPrimaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of provides', async () => {
    creditRequestPrimaRepositoryMock.listApprovedCreditRequestByFarmerId.mockResolvedValue(creditRequestFoundMock)

    const creditRequestList = await listApprovedCreditRequestByFarmerUseCase.invoke({farmerId: farmerIdMock})
    
    expect(creditRequestList).toEqual(creditRequestFoundMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an array of provides', async () => {
    creditRequestPrimaRepositoryMock.listApprovedCreditRequestByFarmerId.mockResolvedValue([])

    await expect(listApprovedCreditRequestByFarmerUseCase.invoke({farmerId: farmerIdMock})).rejects.toThrowError('No se ha encontrado creditos aprobados para este usuario')
    await expect(listApprovedCreditRequestByFarmerUseCase.invoke({farmerId: farmerIdMock})).rejects.toBeInstanceOf(NotFoundError)
  })
})