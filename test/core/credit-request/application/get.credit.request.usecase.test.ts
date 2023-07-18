import GetCreditRequestUseCase from '../../../../src/core/credit-request/application/get.credit.request.usecase'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import CreditRequestDetail from '../../../../src/core/credit-request/domain/credit.request.detail.model'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockCreditRequest: CreditRequestDetail = {
    "creditRequestId": "ff782db0-24b4-11ee-84bf-0ed08c7979f9",
    "farmerId": "3.1.1",
    "farmerFullNames": "Josué Emmanuel Medina García",
    "campaignId": "ARR012023",
    "hectareNumber": 1,
    "creditReason": "Necesita credito para su siembra",
    "creditAmount": 1000,
    "guaranteeDescription": "Su predio",
    "guaranteeAmount": 25000,
    "technicalName": "No requiere",
    "assistanceTypeDescription": "INDEPENDIENTES",
    "creditRequestStatus": "Pagado",
    "creditRequestObservation": "Sin observaciones",
    "createDateTime": new Date()
  }

  let creditRequestPersistanceRepository: CreditRequestPrismaRepository
  let getCreditRequestUseCase: GetCreditRequestUseCase

  beforeAll(() => {
    creditRequestPersistanceRepository = new CreditRequestPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(creditRequestPersistanceRepository, 'getCreditRequestById').mockResolvedValue(mockCreditRequest)

    getCreditRequestUseCase = new GetCreditRequestUseCase(creditRequestPersistanceRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Get credit request by id successfully', async () => {
      const creditRequests = await getCreditRequestUseCase.get({ creditRequestId: mockCreditRequest.creditRequestId })

      expect(creditRequests).toBe(mockCreditRequest) 
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await getCreditRequestUseCase.get({ 
          // creditRequestId: mockCreditRequest.creditRequestId 
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })

  describe('NOT FOUND', () => {
    test('Should throw not ofund error when try to get an unexisting credit request', async () => {
      jest.spyOn(creditRequestPersistanceRepository, 'getCreditRequestById').mockResolvedValue(null)

      try {
        await getCreditRequestUseCase.get({ creditRequestId: mockCreditRequest.creditRequestId })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
})