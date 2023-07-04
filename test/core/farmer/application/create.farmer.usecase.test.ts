import CreateFarmerUseCase from '../../../../src/core/farmer/application/create.farmer.usecase'
import { FarmerCreate } from '../../../../src/core/farmer/domain/farmer.create.model'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import FarmerPrismaRepository from '../../../../src/core/farmer/infrastructure/farmer.prisma.repository'
import Project from '../../../../src/core/project/domain/project.model'
import ProjectPrismaRepository from '../../../../src/core/project/infrastructure/project.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockFarmerCreate: FarmerCreate = {
    propertySectorId: 3,
    propertyProjectId: 12,
    farmerQualityId: 1,
    farmerType: FarmerType.INDIVIDUAL,
    fullNames: 'Farmer test',
    dni: '28303402',
    propertyLocation: 'Av. Brasil',
    propertyLegalConditionId: 1,
    cadastralRegistry: '283939022QW',
    farmerAddress: '92h829',
    farmerProjectId: 1,
    propertyHectareQuantity: 10
  }

  const mockProjects: Project[] = [
    {
      projectCode: 12,
      projectDescription: 'San Julian',
      projectId: 12,
      projectSectorId: 3
    }
  ]

  const mockFarmerCreater = {
    farmerId: '10.2.3',
    fullNames: 'Farmer test',
    socialReason: null
  }

  let farmerPrismaRepository: FarmerPrismaRepository
  let projectPrismaRepository: ProjectPrismaRepository
  let createFarmerUseCase: CreateFarmerUseCase

  beforeAll(() => {
    farmerPrismaRepository = new FarmerPrismaRepository()
    projectPrismaRepository = new ProjectPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(projectPrismaRepository, 'getProjectsBySector').mockResolvedValue(mockProjects)
    jest.spyOn(farmerPrismaRepository, 'getFarmerCount').mockResolvedValue(1)
    jest.spyOn(farmerPrismaRepository, 'createFarmer').mockResolvedValue(mockFarmerCreater)

    createFarmerUseCase = new CreateFarmerUseCase(farmerPrismaRepository, projectPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Create a farmer successfully', async () => {
      const message = await createFarmerUseCase.create(mockFarmerCreate)

      expect(message).toBe(`Agricultor ${mockFarmerCreater.fullNames || mockFarmerCreater.socialReason} con código ${mockFarmerCreater.farmerId} creado exitósamente`)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw an error when body request contains an undefined attribute when must to be required', async () => {
      try {
        // @ts-ignore
        await createFarmerUseCase.create({
          propertyProjectId: 12,
          farmerQualityId: 1,
          farmerType: FarmerType.INDIVIDUAL,
          fullNames: 'Farmer test',
          dni: '28303402',
          propertyLocation: 'Av. Brasil',
          propertyLegalConditionId: 1,
          cadastralRegistry: '283939022QW',
          farmerAddress: '92h829',
          farmerProjectId: 1,
          propertyHectareQuantity: 10
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw an error when body request contains an undefined attribute when must to be number', async () => {
      try {
        await createFarmerUseCase.create({
          // @ts-ignore
          propertySectorId: '2',
          propertyProjectId: 12,
          farmerQualityId: 1,
          farmerType: FarmerType.INDIVIDUAL,
          fullNames: 'Farmer test',
          dni: '28303402',
          propertyLocation: 'Av. Brasil',
          propertyLegalConditionId: 1,
          cadastralRegistry: '283939022QW',
          farmerAddress: '92h829',
          farmerProjectId: 1,
          propertyHectareQuantity: 10
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw an error when body request contains an invalid farmerType', async () => {
      try {
        await createFarmerUseCase.create({
          propertySectorId: 2,
          propertyProjectId: 12,
          farmerQualityId: 1,
          // @ts-ignore
          farmerType: 'Other',
          fullNames: 'Farmer test',
          dni: '28303402',
          propertyLocation: 'Av. Brasil',
          propertyLegalConditionId: 1,
          cadastralRegistry: '283939022QW',
          farmerAddress: '92h829',
          farmerProjectId: 1,
          propertyHectareQuantity: 10
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw an error when body request contains an invalid farmerType', async () => {
      try {
        await createFarmerUseCase.create({
          propertySectorId: 2,
          propertyProjectId: 12,
          farmerQualityId: 1,
          farmerType: FarmerType.INDIVIDUAL,
          propertyLocation: 'Av. Brasil',
          propertyLegalConditionId: 1,
          cadastralRegistry: '283939022QW',
          farmerAddress: '92h829',
          farmerProjectId: 1,
          propertyHectareQuantity: 10
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw an error when body request contains an invalid farmerType', async () => {
      try {
        await createFarmerUseCase.create({
          propertySectorId: 2,
          propertyProjectId: 12,
          farmerQualityId: 1,
          farmerType: FarmerType.ASSOCIATION,
          fullNames: 'Farmer test',
          dni: '28303402',
          propertyLocation: 'Av. Brasil',
          propertyLegalConditionId: 1,
          cadastralRegistry: '283939022QW',
          farmerAddress: '92h829',
          farmerProjectId: 1,
          propertyHectareQuantity: 10
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })

  describe('NOT FOUND', () => {
    test('Should throw a not found error when create a farmer with unexists project', async () => {
      jest.spyOn(projectPrismaRepository, 'getProjectsBySector').mockResolvedValue([])
      try {
        await createFarmerUseCase.create(mockFarmerCreate)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
})