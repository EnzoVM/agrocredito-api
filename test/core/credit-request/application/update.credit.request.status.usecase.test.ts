import UpdateCreditRequestStatusUseCase from '../../../../src/core/credit-request/application/update.credit.request.status.usecase'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import CreditRequestDetail from '../../../../src/core/credit-request/domain/credit.request.detail.model'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import { CreditRequestStatusType } from '../../../../src/core/credit-request/domain/credit.request.status.type'

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
  let updateCreditRequestStatusUseCase: UpdateCreditRequestStatusUseCase

  beforeAll(() => {
    creditRequestPersistanceRepository = new CreditRequestPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(creditRequestPersistanceRepository, 'getCreditRequestById').mockResolvedValue(mockCreditRequest)
    jest.spyOn(creditRequestPersistanceRepository, 'updateCreditRequestStatusById').mockResolvedValue('Update successfuly')

    updateCreditRequestStatusUseCase = new UpdateCreditRequestStatusUseCase(creditRequestPersistanceRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Update credit request status by id successfully', async () => {
      const message = await updateCreditRequestStatusUseCase.update({ 
        creditRequestId: '162738393',
        creditRequestStatus: CreditRequestStatusType.PENDING
      })

      expect(message).toBe(`El estado de la solicitud de crédito ha actualizado de ${mockCreditRequest.creditRequestStatus} a ${CreditRequestStatusType.PENDING} exitosamente`)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await updateCreditRequestStatusUseCase.update({ 
          // creditRequestId: '162738393',
          creditRequestStatus: CreditRequestStatusType.PENDING
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await updateCreditRequestStatusUseCase.update({ 
          creditRequestId: '162738393',
          // creditRequestStatus: CreditRequestStatusType.PENDING
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when send invalid data', async () => {
      try {
        await updateCreditRequestStatusUseCase.update({ 
          creditRequestId: '162738393',
          // @ts-ignore
          creditRequestStatus: 'Test'
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
        await updateCreditRequestStatusUseCase.update({ 
          creditRequestId: '162738393',
          creditRequestStatus: CreditRequestStatusType.PENDING
        })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
})