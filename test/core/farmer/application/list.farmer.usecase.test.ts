import ListFarmerUseCase from '../../../../src/core/farmer/application/list.farmer.usecase'
import { FarmerList } from '../../../../src/core/farmer/domain/farmer.list.model'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import FarmerPrismaRepository from '../../../../src/core/farmer/infrastructure/farmer.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockFarmerList: {
    farmers: FarmerList[];
    count: number;
  } = {
    farmers: [
      {
        farmerId: '4.26.2',
        farmerQualityDescription: 'Bueno',
        farmerType: 'Individual',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        dni: "87654321"
      },
      {
        farmerId: '4.26.3',
        farmerQualityDescription: 'Bueno',
        farmerType: 'Individual',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        dni: "87654322"
      },
      {
        farmerId: '4.26.4',
        farmerQualityDescription: 'Bueno',
        farmerType: 'Individual',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        dni: "87654323"
      }
    ],
    count: 3
  }

  let farmerPrismaRepository: FarmerPrismaRepository
  let listFarmerUseCase: ListFarmerUseCase

  beforeAll(() => {
    farmerPrismaRepository = new FarmerPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(farmerPrismaRepository, 'getFarmersById').mockResolvedValue(mockFarmerList)
    jest.spyOn(farmerPrismaRepository, 'getFarmersByFullNames').mockResolvedValue(mockFarmerList)
    jest.spyOn(farmerPrismaRepository, 'getFarmersBySocialReason').mockResolvedValue(mockFarmerList)

    listFarmerUseCase = new ListFarmerUseCase(farmerPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('List farmers with code successfully', async () => {
      const farmerAttributes = await listFarmerUseCase.list({
        searchType: 'code',
        farmerId: '10',
        farmerFullNames: 'SDNBIU',
        farmerType: FarmerType.INDIVIDUAL,
        page: 1,
        limit: 2
      })

      expect(farmerAttributes.farmers.length).toBe(2)
      expect(farmerAttributes.count).toBe(3)
    })

    test('List farmers with name successfully', async () => {
      const farmerAttributes = await listFarmerUseCase.list({
        searchType: 'name',
        farmerId: '10',
        farmerFullNames: 'SDNBIU',
        farmerType: FarmerType.INDIVIDUAL,
        page: 1,
        limit: 2
      })

      expect(farmerAttributes.farmers.length).toBe(2)
      expect(farmerAttributes.count).toBe(3)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error', async () => {
      try {
        // @ts-ignore
        await listFarmerUseCase.list({
          searchType: 'code',
          farmerId: '10',
          farmerFullNames: 'SDNBIU',
          farmerType: FarmerType.INDIVIDUAL,
          //page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error', async () => {
      try {
        await listFarmerUseCase.list({
          // @ts-ignore
          searchType: 'code1',
          farmerId: '10',
          farmerFullNames: 'SDNBIU',
          farmerType: FarmerType.INDIVIDUAL,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error', async () => {
      try {
        await listFarmerUseCase.list({
          searchType: 'code',
          farmerId: '10',
          farmerFullNames: 'SDNBIU',
          // @ts-ignore
          farmerType: 'Other',
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error', async () => {
      try {
        await listFarmerUseCase.list({
          searchType: 'code',
          //farmerId: '10',
          farmerFullNames: 'SDNBIU',
          farmerType: FarmerType.INDIVIDUAL,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error', async () => {
      try {
        await listFarmerUseCase.list({
          searchType: 'name',
          farmerId: '10',
          // farmerFullNames: 'SDNBIU',
          farmerType: FarmerType.INDIVIDUAL,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error', async () => {
      try {
        await listFarmerUseCase.list({
          searchType: 'name',
          farmerId: '10',
          farmerFullNames: 'SDNBIU',
          farmerType: FarmerType.ASSOCIATION,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })
})