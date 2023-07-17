import ListAllAssistanceTypeUseCase from '../../../../src/core/assistance-type/application/list.all.assistance.type.usecase'
import { assistanceTypePrismaRepositoryMock, assistanceTypeListMock } from '../mocks/list.all.assistance.type.usecase.mock'

const listAllAssistanceTypeUseCase = new ListAllAssistanceTypeUseCase(assistanceTypePrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of assistance type', async () => {
    assistanceTypePrismaRepositoryMock.listAllAssistanceType.mockResolvedValue(assistanceTypeListMock)

    const assistanceTypeList = await listAllAssistanceTypeUseCase.invoke()
    
    expect(assistanceTypeList).toEqual(assistanceTypeListMock)
  })

  test('Should return an empty array', async () => {
    assistanceTypePrismaRepositoryMock.listAllAssistanceType.mockResolvedValue([])

    const assistanceTypeList = await listAllAssistanceTypeUseCase.invoke()
    
    expect(assistanceTypeList).toEqual([])
  })
})

