import ListAllSectorUseCase from '../../../../src/core/sector/application/list.all.sector.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import { 
  sectorPrismaRepositoryMock,
  paramMock,
  paramMockEmpty,
  paramMockWrong,
  response
} from '../mocks/list.all.sector.mock'

const listAllSectorUseCase = new ListAllSectorUseCase(sectorPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a list of all sectors', async () => {
    sectorPrismaRepositoryMock.listAllSectors.mockResolvedValue(response)

    const {sectorList, count} = await listAllSectorUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'all'
    })
    
    expect(count).toEqual(response.count)
    expect(sectorList).toHaveLength(3)
  })

  test('Should return a list of sectors by name', async () => {
    sectorPrismaRepositoryMock.listSectorsByName.mockResolvedValue(response)

    const {sectorList, count} = await listAllSectorUseCase.invoke({
      sectorDescription: paramMock.sectorDescription,
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'name'
    })
    
    expect(count).toEqual(response.count)
    expect(sectorList).toHaveLength(3)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when some parameters are empty', async () => {
    for(const param of paramMockEmpty){
      await expect(listAllSectorUseCase.invoke({
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit,
        typeSearch: 'all'
      })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

      await expect(listAllSectorUseCase.invoke({
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit,
        typeSearch: 'all'
      })).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when some parameters are wrong', async () => {
    for(const param of paramMockWrong){
      await expect(listAllSectorUseCase.invoke({
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit,
        typeSearch: 'all'
      })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

      await expect(listAllSectorUseCase.invoke({
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit,
        typeSearch: 'all'
      })).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when make a mistake in the type of search', async () => {
    await expect(listAllSectorUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      //@ts-ignore
      typeSearch: 'rrrr'
    })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

    await expect(listAllSectorUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      //@ts-ignore
      typeSearch: 'rrrr'
    })).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the sectorDescription is not specified', async () => {
    await expect(listAllSectorUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'name'
    })).rejects.toThrowError('Se tiene que especificar el nombre del sector')

    await expect(listAllSectorUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'name'
    })).rejects.toBeInstanceOf(BadRequestError)
  })
})