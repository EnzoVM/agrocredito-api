import ListPaymentUseCase from '../../../../src/core/payment/application/list.payment.usecase'
import PaymentListModel from '../../../../src/core/payment/domain/payment.list.model'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import PaymentPrismaRepository from '../../../../src/core/payment/infrastructure/payment.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/payment/infrastructure/payment.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockPaymentList: {
    payments: PaymentListModel[], 
    count: number
  } = {
    payments: [
      {
        "paymentId": 1,
        "fullNames": "Martin Perez",
        "deliveryDateTime": new Date(),
        "financialSourceDescription": "Recuperaciones M.E.",
        "currentAccountDescription": "007251-1-32",
        "paymentDescription": "RELACION ABONOS 001",
        "paymentAmount": 100
      },
      {
        "paymentId": 2,
        "fullNames": "Martin Perez",
        "deliveryDateTime": new Date(),
        "financialSourceDescription": "Recuperaciones M.E.",
        "currentAccountDescription": "007251-1-32",
        "paymentDescription": "RELACION ABONOS 001",
        "paymentAmount": 100
      },
      {
        "paymentId": 3,
        "fullNames": "Martin Perez",
        "deliveryDateTime": new Date(),
        "financialSourceDescription": "Recuperaciones M.E.",
        "currentAccountDescription": "007251-1-32",
        "paymentDescription": "RELACION ABONOS 001",
        "paymentAmount": 100
      }
    ],
    count: 3
  }

  let paymentPrismaRepository: PaymentPrismaRepository
  let listPaymentUseCase: ListPaymentUseCase

  beforeAll(() => {
    paymentPrismaRepository = new PaymentPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(paymentPrismaRepository, 'listPayments').mockResolvedValue(mockPaymentList)

    listPaymentUseCase = new ListPaymentUseCase(paymentPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('List payments by individual farmer type successfully', async () => {
      const payments = await listPaymentUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.INDIVIDUAL,
        fullNames: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(payments.payments.length).toBe(3)
      expect(payments.count).toBe(3)
    })

    test('List payments by individual farmer type successfully', async () => {
      const payments = await listPaymentUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.ASSOCIATION,
        socialReason: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(payments.payments.length).toBe(3)
      expect(payments.count).toBe(3)
    })

    test('List payments by individual farmer type successfully', async () => {
      const payments = await listPaymentUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.ALL,
        socialReason: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(payments.payments.length).toBe(3)
      expect(payments.count).toBe(3)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await listPaymentUseCase.list({
          campaignId: 'a',
          farmerType: FarmerType.ASSOCIATION,
          socialReason: 'Josue Medina', 
          // page: 1,
          limit: 0
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when send invalid farmer type', async () => {
      try {
        await listPaymentUseCase.list({
          campaignId: 'a',
          // @ts-ignore
          farmerType: 'test',
          socialReason: 'Josue Medina', 
          page: 1,
          limit: 0
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when no send full names', async () => {
      try {
        await listPaymentUseCase.list({
          campaignId: 'a',
          farmerType: FarmerType.INDIVIDUAL, 
          page: 1,
          limit: 0
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when no send social reason', async () => {
      try {
        await listPaymentUseCase.list({
          campaignId: 'a',
          farmerType: FarmerType.ASSOCIATION, 
          page: 1,
          limit: 0
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })
})