import DeleteSectorUseCase from '../../../../src/core/sector/application/delete.sector.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  sectorPrismaRepositoryMock,
  projectPrismaRepositoryMock,
  paramMock,
  paramMockEmpty,
  paramMockWrong,
  projectFoundMock,
  sectorDeletedMessageMock
} from '../mocks/delete.sector.mock'

const deleteSectorUseCase = new DeleteSectorUseCase(sectorPrismaRepositoryMock, projectPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.getProjectsBySector.mockResolvedValue([])
    sectorPrismaRepositoryMock.deleteSectorById.mockResolvedValue(sectorDeletedMessageMock)

    const sectorDeletedMessage = await deleteSectorUseCase.invoke(paramMock)
    
    expect(sectorDeletedMessage).toEqual(sectorDeletedMessageMock)
  })
})

describe('PROCESS ERROR', () => {
  test('Should return an error when there are associated projects', async () => {
    projectPrismaRepositoryMock.getProjectsBySector.mockResolvedValue(projectFoundMock)
  
    await expect(deleteSectorUseCase.invoke(paramMock)).rejects.toThrowError('No se ha podido eliminar el sector, porque tiene proyectos asociados')
    await expect(deleteSectorUseCase.invoke(paramMock)).rejects.toBeInstanceOf(ProcessError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when the sectorId is not a number', async () => {
    //@ts-ignore    
    await expect(deleteSectorUseCase.invoke(paramMockWrong)).rejects.toThrowError('El id del sector tiene que ser un número')
    //@ts-ignore  
    await expect(deleteSectorUseCase.invoke(paramMockWrong)).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the sectorId is empty', async () => {
    //@ts-ignore    
    await expect(deleteSectorUseCase.invoke(paramMockEmpty)).rejects.toThrowError('Se tiene que especificar el id del sector a eliminar')
    //@ts-ignore  
    await expect(deleteSectorUseCase.invoke(paramMockEmpty)).rejects.toBeInstanceOf(BadRequestError)
  })
})