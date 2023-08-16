import DeleteProjectByIdUseCase from '../../../../src/core/project/application/delete.project.by.id.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  projectPrismaRepositoryMock,
  farmerPrismaRepositoryMock, 
  farmerCountMock,
  projectDeletedMessageMock,
  projectFoundMock,
  projectIdMock,
  projectIdMockEmpty,
  projectIdMockWrong
} from '../mocks/delete.project.by.id.mock'

const deleteProjectByIdUseCase = new DeleteProjectByIdUseCase(projectPrismaRepositoryMock, farmerPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(projectFoundMock)
    farmerPrismaRepositoryMock.countFarmerMatchToProject.mockResolvedValue(farmerCountMock)
    projectPrismaRepositoryMock.deleteProjectById.mockResolvedValue(projectDeletedMessageMock)

    const projectDeletedMessage = await deleteProjectByIdUseCase.invoke(projectIdMock)
    
    expect(projectDeletedMessage).toEqual(projectDeletedMessageMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an error when project is not found', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(null)

    await expect(deleteProjectByIdUseCase.invoke(projectIdMock)).rejects.toThrowError('El proyecto no ha eliminado porque no existe')
    await expect(deleteProjectByIdUseCase.invoke(projectIdMock)).rejects.toBeInstanceOf(NotFoundError)
  })
})

describe('PROCESS ERROR', () => {
  test('Should return an error when there are associated farmers', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(projectFoundMock)
    farmerPrismaRepositoryMock.countFarmerMatchToProject.mockResolvedValue(1)

    await expect(deleteProjectByIdUseCase.invoke(projectIdMock)).rejects.toThrowError('No se ha podido eliminar el proyecto, porque tiene agricultores asociados')
    await expect(deleteProjectByIdUseCase.invoke(projectIdMock)).rejects.toBeInstanceOf(ProcessError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when params are empty', async () => {
    //@ts-ignore
    await expect(deleteProjectByIdUseCase.invoke(projectIdMockEmpty)).rejects.toThrowError('Se tiene que especificar el id del proyecto a eliminar')
    //@ts-ignore
    await expect(deleteProjectByIdUseCase.invoke(projectIdMockEmpty)).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when params are wrong', async () => {
    //@ts-ignore
    await expect(deleteProjectByIdUseCase.invoke(projectIdMockWrong)).rejects.toThrowError('El id del proyecto tiene que ser un número')
    //@ts-ignore
    await expect(deleteProjectByIdUseCase.invoke(projectIdMockWrong)).rejects.toBeInstanceOf(BadRequestError)
  })
})
