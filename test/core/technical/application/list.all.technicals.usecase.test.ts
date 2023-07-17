import ListAllTechnicalsUseCase from '../../../../src/core/technical/application/list.all.technicals.usecase'
import { technicalPrismaRepositoryMock, technicalListMock } from '../mocks/list.all.technicals.usecase.mock'

const listAllTechnicalsUseCase = new ListAllTechnicalsUseCase(technicalPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an array of technicals', async () => {
    technicalPrismaRepositoryMock.listAllTechnicals.mockResolvedValue(technicalListMock)

    const technicalList = await listAllTechnicalsUseCase.invoke()
    
    expect(technicalList).toEqual(technicalListMock)
    expect(technicalList[0].assistanceTypeDescription).toStrictEqual("SERVIAGRO")
  })

  test('Should return an empty array', async () => {
    technicalPrismaRepositoryMock.listAllTechnicals.mockResolvedValue([])

    const technicalList = await listAllTechnicalsUseCase.invoke()
    
    expect(technicalList).toEqual([])
  })
})
