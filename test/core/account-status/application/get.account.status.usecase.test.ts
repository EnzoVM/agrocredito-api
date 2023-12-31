import GetAccountStatusUseCase from '../../../../src/core/account-status/application/get.account.status.usecase'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import AccountStatusModel from '../../../../src/core/account-status/domain/account.status.model'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import DeliveryPrismaRepository from '../../../../src/core/delivery/infrastructure/delivery.prisma.repository'
import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import LogRecordMongoDBRepository from '../../../../src/core/log-record/infrastructure/log.record.mongodb.repository'
import CreditRequestDetail from '../../../../src/core/credit-request/domain/credit.request.detail.model'
import PaymentPrismaRepository from '../../../../src/core/payment/infrastructure/payment.prisma.repository'
import Campaign from '../../../../src/core/campaign/domain/campaign.model'
import DeliveryListModel from '../../../../src/core/delivery/domain/delivery.list.model'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import PaymentListModel from '../../../../src/core/payment/domain/payment.list.model'
import LogRecordPersistanceRepository from '../../../../src/core/log-record/domain/log.record.persistance.repository'

jest.mock('../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository')
jest.mock('../../../../src/core/delivery/domain/delivery.persistance.respository')
jest.mock('../../../../src/core/campaign/domain/campaign.persistance.repository')
jest.mock('../../../../src/core/payment/infrastructure/payment.prisma.repository')
jest.mock('../../../../src/core/payment/infrastructure/payment.prisma.repository')


describe('Create Campaign module test suites', () => {
  const date = new Date()

  const mockCreditRequest: CreditRequestDetail = {
    "creditRequestId": "ff782db0-24b4-11ee-84bf-0ed08c7979f9",
    "farmerId": "3.1.1",
    "farmerFullNames": "Josué Emmanuel Medina García",
    "campaignId": "ARR012023",
    "hectareNumber": 1,
    "creditReason": "Necesita credito para su siembra",
    "creditAmount": 1200,
    "guaranteeDescription": "Su predio",
    "guaranteeAmount": 25000,
    "technicalName": "No requiere",
    "assistanceTypeDescription": "INDEPENDIENTES",
    "creditRequestStatus": "Aprobado",
    "creditRequestObservation": "Sin observaciones",
    "createDateTime": date
  }

  const mockCampaign: Campaign = {
    campaignDelinquentInterest: 0,
    campaignDescription: '38383',
    campaignId: '93',
    campaignInterest: 25,
    campaignTypeId: 10,
    campaignYear: '292',
    finishDate: date.toISOString(),
    periodName: '2',
    startDate: date.toISOString()
  }

  const mockDeliveryList: DeliveryListModel[] = [
    {
      deliveryId: 1,
      fullNames: "Josue Emmanuel Medina Garcia",
      deliveryDateTime: date,
      providerDescription: "BANCO DE LA NACIÓN",
      financialSourceDescription: "Recuperaciones M.E.",
      currentAccountDescription: "Descriptiuon",
      gloss: "RELACION GIROS 001",
      deliveryAmount: 48
    },
    {
      deliveryId: 2,
      fullNames: "Josue Emmanuel Medina Garcia",
      deliveryDateTime: date,
      providerDescription: "BANCO DE LA NACIÓN",
      financialSourceDescription: "Recuperaciones M.E.",
      currentAccountDescription: "Descriptiuon",
      gloss: "RELACION GIROS 002",
      deliveryAmount: 12
    }
  ]

  const mockPayments: PaymentListModel[] = [
    {
      currentAccountDescription: '',
      financialSourceDescription: '',
      paymentAmount: 100,
      paymentDateTime: date,
      paymentDescription: '',
      paymentId: 1
    },
    {
      currentAccountDescription: '',
      financialSourceDescription: '',
      paymentAmount: 100,
      paymentDateTime: date,
      paymentDescription: '',
      paymentId: 2
    }
  ]
  
  const mockAccountSatusModel: AccountStatusModel = {
    "campaignFinishDate": '26/08',
    "amountDelivered": 60,
    "amountDeliveredPercentage": 100,
    "delinquentInterest": 0,
    "delinquentInterestPercentage": 30,
    "finalDebt": 940,
    "payments": mockPayments.map(payment => {
      return {
        paymentAmount: payment.paymentAmount,
        transactionDateTime: payment.paymentDateTime
      }
    }),
    capital: 0,
    "interest": 0,
    deliveries: mockDeliveryList.map(delivery => {
      return {
        deliveryAmount: delivery.deliveryAmount,
        deliveryDateTime: delivery.deliveryDateTime
      }
    }),
    "interesPercentage": 25,
    "totalPayment": 200,
    "creditAmount": mockCreditRequest.creditAmount,
    farmerData: {
      farmerId: ''
    },
    campaignId: '',
    creditRequesId: ''
  }

  let creditRequestPersistanceRepository: CreditRequestPrismaRepository
  let deliveryPersistanceRepository: DeliveryPrismaRepository
  let campaignPersistanceRepository: CampaignPrismaRepository
  let paymentPrismaRepository: PaymentPrismaRepository
  let logRecordMongoDBRepository: LogRecordMongoDBRepository

  let getAccountStatusUseCase: GetAccountStatusUseCase

  beforeAll(() => {
    creditRequestPersistanceRepository = new CreditRequestPrismaRepository()
    deliveryPersistanceRepository = new DeliveryPrismaRepository()
    campaignPersistanceRepository = new CampaignPrismaRepository()
    paymentPrismaRepository = new PaymentPrismaRepository()
    logRecordMongoDBRepository = new LogRecordMongoDBRepository()
  })

  beforeEach(() => {
    jest.spyOn(creditRequestPersistanceRepository, 'getCreditRequestById').mockResolvedValue(mockCreditRequest)
    jest.spyOn(deliveryPersistanceRepository, 'listDeliveriesByCreditRequestId').mockResolvedValue(mockDeliveryList)
    jest.spyOn(campaignPersistanceRepository, 'getCampaignById').mockResolvedValue(mockCampaign)
    jest.spyOn(paymentPrismaRepository, 'listPaymentsByCreditRequestId').mockResolvedValue(mockPayments)
    jest.spyOn(logRecordMongoDBRepository, 'createNewRecord').mockResolvedValue('3939i4-349343')
    jest.spyOn(logRecordMongoDBRepository, 'setEndRequestTimeRecordById').mockResolvedValue('3939i4-349343')

    getAccountStatusUseCase = new GetAccountStatusUseCase(
      creditRequestPersistanceRepository,
      deliveryPersistanceRepository,
      campaignPersistanceRepository,
      paymentPrismaRepository,
      logRecordMongoDBRepository
    )
  })

  describe('OPERATION SUCCESS', () => {
    test('Get credit request by id successfully', async () => {
      const accountStatus = await getAccountStatusUseCase.get({ creditRequestId: '22929'})

      expect(accountStatus.finalDebt).toBe(mockAccountSatusModel.finalDebt) 
      expect(accountStatus.totalPayment).toBe(mockAccountSatusModel.totalPayment) 
      expect(accountStatus.amountDelivered).toBe(mockAccountSatusModel.amountDelivered) 
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await getAccountStatusUseCase.get({ 
          // creditRequestId: '22929'
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
        await getAccountStatusUseCase.get({ creditRequestId: '22929'})
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  describe('PROCESS ERROR', () => {
    test('Should throw process error when try to get an unexisting campaign', async () => {
      jest.spyOn(campaignPersistanceRepository, 'getCampaignById').mockResolvedValue(null)

      try {
        await getAccountStatusUseCase.get({ creditRequestId: '22929'})
      } catch (error) {
        expect(error).toBeInstanceOf(ProcessError)
      }
    })

    test('Should throw process error when try to get an unexisting campaign', async () => {
      const mockPendingCreditRequest: CreditRequestDetail = {
        "creditRequestId": "ff782db0-24b4-11ee-84bf-0ed08c7979f9",
        "farmerId": "3.1.1",
        "farmerFullNames": "Josué Emmanuel Medina García",
        "campaignId": "ARR012023",
        "hectareNumber": 1,
        "creditReason": "Necesita credito para su siembra",
        "creditAmount": 60,
        "guaranteeDescription": "Su predio",
        "guaranteeAmount": 25000,
        "technicalName": "No requiere",
        "assistanceTypeDescription": "INDEPENDIENTES",
        "creditRequestStatus": "Pendiente",
        "creditRequestObservation": "Sin observaciones",
        "createDateTime": date
      }
      jest.spyOn(creditRequestPersistanceRepository, 'getCreditRequestById').mockResolvedValue(mockPendingCreditRequest)

      try {
        await getAccountStatusUseCase.get({ creditRequestId: '22929'})
      } catch (error) {
        expect(error).toBeInstanceOf(ProcessError)
      }
    })
  })
})