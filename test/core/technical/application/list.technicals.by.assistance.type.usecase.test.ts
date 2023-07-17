import ListTechnicalsByAssistanceTypeUseCase from '../../../../src/core/technical/application/list.technicals.by.assistance.type.usecase'
import { technicalPrismaRepositoryMock, assistanceTypeIdMock, technicalListMock } from '../mocks/list.technicals.by.assistance.type.usecase.mock'

const listTechnicalsByAssistanceTypeUseCase = new ListTechnicalsByAssistanceTypeUseCase(technicalPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of technicals by assistance type', async () => {
    technicalPrismaRepositoryMock.listTechnicalsByAssistanceType.mockResolvedValue(technicalListMock)

    const technicalList = await listTechnicalsByAssistanceTypeUseCase.invoke({assistanceTypeId: assistanceTypeIdMock})
    
    expect(technicalList).toEqual(technicalListMock)
    expect(technicalList[0].assistanceTypeDescription).toStrictEqual("INDEPENDIENTES")
  })

  test('Should return an empty array', async () => {
    technicalPrismaRepositoryMock.listTechnicalsByAssistanceType.mockResolvedValue([])

    const technicalList = await listTechnicalsByAssistanceTypeUseCase.invoke({assistanceTypeId: assistanceTypeIdMock})
    
    expect(technicalList).toEqual([])
  })
})