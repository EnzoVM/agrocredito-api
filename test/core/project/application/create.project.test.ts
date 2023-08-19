import CreateProjectUseCase from '../../../../src/core/project/application/create.project.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import { 
  projectPrismaRepositoryMock,
  lastProjectCodeMock,
  paramMock,
  projectAddedMock, 
  projectAddedMockAlternative,
  paramMockEmpty,
  paramMockWrong
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
    projectPrismaRepositoryMock.createProject.mockResolvedValue(projectAddedMockAlternative)

    const projectAdded = await createProjectUseCase.invoke(paramMock)
    
    expect(projectAdded.projectCode).toEqual(1)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when the params are empty', async () => {
    for(const param of paramMockEmpty){
      //@ts-ignore
      await expect(createProjectUseCase.invoke(param)).rejects.toThrowError('Se tiene que especificar los campos requeridos')
      //@ts-ignore
      await expect(createProjectUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when the params are wrong', async () => {
    for(const param of paramMockWrong){
      //@ts-ignore
      await expect(createProjectUseCase.invoke(param)).rejects.toThrowError('Se tiene que especificar los campos requeridos')
      //@ts-ignore
      await expect(createProjectUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })
})