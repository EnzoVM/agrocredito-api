import ListAllProjectsUseCase from '../../../../src/core/project/application/list.all.projects.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import { 
  projectPrismaRepositoryMock,
  paramEmptyMock,
  paramsWrong,
  paramMock,
  response
} from '../mocks/list.all.projects.mock'

const listAllProjectsUseCase = new ListAllProjectsUseCase(projectPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.listAllProjects.mockResolvedValue(response)

    const {projectList, count} = await listAllProjectsUseCase.invoke({
      page: paramMock.page, 
      limit: paramMock.limit, 
      typeSearch: 'all'
    })

    expect(count).toEqual(response.count)
    expect(projectList).toHaveLength(5)
  })

  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.listProjectsBySector.mockResolvedValue(response)

    const {projectList, count} = await listAllProjectsUseCase.invoke({
      sectorId: paramMock.sectorId,
      page: paramMock.page, 
      limit: paramMock.limit, 
      typeSearch: 'sector'
    })

    expect(count).toEqual(response.count)
    expect(projectList).toHaveLength(5)
  })

  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.listProjectsByName.mockResolvedValue(response)

    const {projectList, count} = await listAllProjectsUseCase.invoke({
      projectDescription: paramMock.projectDescription,
      page: paramMock.page, 
      limit: paramMock.limit, 
      typeSearch: 'name'
    })

    expect(count).toEqual(response.count)
    expect(projectList).toHaveLength(5)
  })

  test('Should return a successful deletion message', async () => {
    projectPrismaRepositoryMock.listProjectsBySectorAndName.mockResolvedValue(response)

    const {projectList, count} = await listAllProjectsUseCase.invoke({
      sectorId: paramMock.sectorId,
      projectDescription: paramMock.projectDescription,
      page: paramMock.page, 
      limit: paramMock.limit, 
      typeSearch: 'both'
    })
    
    expect(count).toEqual(response.count)
    expect(projectList).toHaveLength(5)
  })
})


describe('BAD REQUEST ERROR', () => {
  test('Should return an error when some parameters are empty', async () => {
    for(const param of paramEmptyMock){
      await expect(listAllProjectsUseCase.invoke({
        sectorId: param.sectorId,
        projectDescription: param.projectDescription,
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit, 
        typeSearch: 'all'
      })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

      await expect(listAllProjectsUseCase.invoke({
        sectorId: param.sectorId,
        projectDescription: param.projectDescription,
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit, 
        typeSearch: 'all'
      })).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when some parameters are wrong', async () => {
    for(const param of paramsWrong){
      await expect(listAllProjectsUseCase.invoke({
        sectorId: param.sectorId,
        projectDescription: param.projectDescription,
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit, 
        typeSearch: 'all'
      })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

      await expect(listAllProjectsUseCase.invoke({
        sectorId: param.sectorId,
        projectDescription: param.projectDescription,
        //@ts-ignore
        page: param.page,
        //@ts-ignore
        limit: param.limit, 
        typeSearch: 'all'
      })).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when make a mistake in the type of search', async () => {
      await expect(listAllProjectsUseCase.invoke({
        sectorId: paramMock.sectorId,
        projectDescription: paramMock.projectDescription,
        page: paramMock.page,
        limit: paramMock.limit, 
        //@ts-ignore
        typeSearch: 'Mal'
      })).rejects.toThrowError('Se tiene que especificar los campos requeridos')

      await expect(listAllProjectsUseCase.invoke({
        sectorId: paramMock.sectorId,
        projectDescription: paramMock.projectDescription,
        page: paramMock.page,
        limit: paramMock.limit, 
        //@ts-ignore
        typeSearch: 'Mal'
      })).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the sector is not specified', async () => {
    await expect(listAllProjectsUseCase.invoke({
      projectDescription: paramMock.projectDescription,
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'sector'
    })).rejects.toThrowError('Se tiene que especificar el sector')

    await expect(listAllProjectsUseCase.invoke({
      projectDescription: paramMock.projectDescription,
      page: paramMock.page,
      limit: paramMock.limit, 
      typeSearch: 'sector'
    })).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the project description is not specified', async () => {
    await expect(listAllProjectsUseCase.invoke({
      sectorId: paramMock.sectorId,
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'name'
    })).rejects.toThrowError('Se tiene que especificar el nombre del proyecto')

    await expect(listAllProjectsUseCase.invoke({
      sectorId: paramMock.sectorId,
      page: paramMock.page,
      limit: paramMock.limit, 
      typeSearch: 'name'
    })).rejects.toBeInstanceOf(BadRequestError)
  })

  test('Should return an error when the project description and sector are not specified', async () => {
    await expect(listAllProjectsUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit,
      typeSearch: 'both'
    })).rejects.toThrowError('Se tiene que especificar el nombre del proyecto y el sector')
    
    await expect(listAllProjectsUseCase.invoke({
      page: paramMock.page,
      limit: paramMock.limit, 
      typeSearch: 'both'
    })).rejects.toBeInstanceOf(BadRequestError)
  })
})