import CreateProjectUseCase from '../../../../src/core/project/application/create.project.usecase'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import { 
  projectPrismaRepositoryMock,
  lastProjectCodeMock,
  paramMock,
  projectAddedMock
} from '../mocks/create.project.mock'

const createProjectUseCase = new CreateProjectUseCase(projectPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an project object', async () => {
    projectPrismaRepositoryMock.getLastProjectCodeBySector.mockResolvedValue(lastProjectCodeMock)
    projectPrismaRepositoryMock.createProject.mockResolvedValue(projectAddedMock)

    const projectAdded = await createProjectUseCase.invoke(paramMock)
    
    expect(projectAdded).toEqual(projectAddedMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an error when last project code not found', async () => {
    projectPrismaRepositoryMock.getLastProjectCodeBySector.mockResolvedValue(null)
    
    await expect(createProjectUseCase.invoke(paramMock)).rejects.toThrowError('No se ha encontrado el último código de los proyectos')
    await expect(createProjectUseCase.invoke(paramMock)).rejects.toBeInstanceOf(NotFoundError)
  })
})