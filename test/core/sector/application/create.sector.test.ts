import CreateSectorUseCase from '../../../../src/core/sector/application/create.sector.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import { 
  sectorPrismaRepositoryMock,
  paramMock,
  sectorAddedMock,
  paramMockWrong,
  paramMockEmpty
} from '../mocks/create.sector.mock'

const createSectorUseCase = new CreateSectorUseCase(sectorPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an sector object', async () => {
    sectorPrismaRepositoryMock.createSector.mockResolvedValue(sectorAddedMock)

    const sectorAdded = await createSectorUseCase.invoke(paramMock)
    
    expect(sectorAdded).toEqual(sectorAddedMock)
  })
})


describe('BAD REQUEST ERROR', () => {
  test('Should return an error when the sectorDescription is a number', async () => {
    //@ts-ignore    
    await expect(createSectorUseCase.invoke(paramMockWrong)).rejects.toThrowError('El nombre del nuevo sector no puede ser un número')
    //@ts-ignore  
    await expect(createSectorUseCase.invoke(paramMockWrong)).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the sectorDescription is empty', async () => {
    //@ts-ignore    
    await expect(createSectorUseCase.invoke(paramMockEmpty)).rejects.toThrowError('Se tiene que especificar el nombre del nuevo sector')
    //@ts-ignore  
    await expect(createSectorUseCase.invoke(paramMockEmpty)).rejects.toBeInstanceOf(BadRequestError)
  })
})