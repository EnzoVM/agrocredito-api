import ListCreditRequestUseCase from '../../../../src/core/credit-request/application/list.credit.request.usecase'
import CreditRequestList from '../../../../src/core/credit-request/domain/credit.request.list.model'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import { CreditRequestStatusType } from '../../../../src/core/credit-request/domain/credit.request.status.type'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockCreditRequestList: {
    creditRequests: CreditRequestList[], 
    count: number
  } = {
    creditRequests: [
      {
        creditRequestId: '1288822',
        campaignId: 'ARR012023',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        creditAmount: 1000,
        createDateTime: new Date(),
        updateStatusDateTime: new Date(),
        creditRequestStatus: 'Rechazado',
      },
      {
        creditRequestId: '1288823',
        campaignId: 'ARR012023',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        creditAmount: 1000,
        createDateTime: new Date(),
        updateStatusDateTime: new Date(),
        creditRequestStatus: 'Rechazado',
      },
      {
        creditRequestId: '1288824',
        campaignId: 'ARR012023',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        creditAmount: 1000,
        createDateTime: new Date(),
        updateStatusDateTime: new Date(),
        creditRequestStatus: 'Rechazado',
      },
    ],
    count: 3
  }

  let creditRequestPersistanceRepository: CreditRequestPrismaRepository
  let listCreditRequestUseCase: ListCreditRequestUseCase

  beforeAll(() => {
    creditRequestPersistanceRepository = new CreditRequestPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(creditRequestPersistanceRepository, 'listCreditRequest').mockResolvedValue(mockCreditRequestList)

    listCreditRequestUseCase = new ListCreditRequestUseCase(creditRequestPersistanceRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('List indiivduals farmers successfully', async () => {
      const creditRequests = await listCreditRequestUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.INDIVIDUAL, 
        creditRequestStatus: CreditRequestStatusType.APROVED, 
        farmerFullNames: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRequests.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })

    test('List asociation farmers successfully', async () => {
      const creditRequests = await listCreditRequestUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.ASSOCIATION, 
        creditRequestStatus: CreditRequestStatusType.APROVED, 
        farmerSocialReason: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRequests.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })

    test('List asociation farmers successfully', async () => {
      const creditRequests = await listCreditRequestUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.ALL, 
        creditRequestStatus: CreditRequestStatusType.APROVED, 
        farmerSocialReason: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRequests.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await listCreditRequestUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.ASSOCIATION, 
          creditRequestStatus: CreditRequestStatusType.APROVED, 
          farmerSocialReason: "Josue", 
          // page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when send invalid farmer type', async () => {
      try {
        await listCreditRequestUseCase.list({
          campaignId: 'ARR012023',
          // @ts-ignore
          farmerType: 'test', 
          creditRequestStatus: CreditRequestStatusType.APROVED, 
          farmerSocialReason: "Josue", 
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when send invalid credit request type', async () => {
      try {
        await listCreditRequestUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.INDIVIDUAL,
          // @ts-ignore
          creditRequestStatus: 'test', 
          farmerSocialReason: "Josue", 
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when no send full names', async () => {
      try {
        await listCreditRequestUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.INDIVIDUAL,
          creditRequestStatus: CreditRequestStatusType.APROVED,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when no send social reason', async () => {
      try {
        await listCreditRequestUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.ASSOCIATION,
          creditRequestStatus: CreditRequestStatusType.APROVED,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })
})