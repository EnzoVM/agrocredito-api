import DeleteProjectByIdUseCase from '../../../../src/core/project/application/delete.project.by.id.usecase'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  projectPrismaRepositoryMock,
  farmerPrismaRepositoryMock, 
  farmerCountMock,
  projectDeletedMessageMock,
  projectFoundMock,
  projectIdMock 
} from '../mocks/delete.project.by.id.mock'

const deleteProjectByIdUseCase = new DeleteProjectByIdUseCase(projectPrismaRepositoryMock, farmerPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(projectFoundMock)
    farmerPrismaRepositoryMock.countFarmerMatchToProject.mockResolvedValue(farmerCountMock)
    projectPrismaRepositoryMock.deleteProjectById.mockResolvedValue(projectDeletedMessageMock)

    const projectDeletedMessage = await deleteProjectByIdUseCase.invoke({projectId: projectIdMock})
    
    expect(projectDeletedMessage).toEqual(projectDeletedMessageMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an error when project is not found', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(null)

    await expect(deleteProjectByIdUseCase.invoke({projectId: projectIdMock})).rejects.toThrowError('El proyecto no ha eliminado porque no existe')
    await expect(deleteProjectByIdUseCase.invoke({projectId: projectIdMock})).rejects.toBeInstanceOf(NotFoundError)
  })
})

describe('PROCESS ERROR', () => {
  test('Should return an error when there are associated farmers', async () => {
    projectPrismaRepositoryMock.getProjectById.mockResolvedValue(projectFoundMock)
    farmerPrismaRepositoryMock.countFarmerMatchToProject.mockResolvedValue(1)

    await expect(deleteProjectByIdUseCase.invoke({projectId: projectIdMock})).rejects.toThrowError('No se ha podido eliminar el proyecto, porque tiene agricultores asociados')
    await expect(deleteProjectByIdUseCase.invoke({projectId: projectIdMock})).rejects.toBeInstanceOf(ProcessError)
  })
})

