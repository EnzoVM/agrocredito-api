import ListCreditRelationUseCase from '../../../../src/core/credit-relation/application/list.credit.relation.usecase'
import CreditRelationList from '../../../../src/core/credit-relation/application/list.credit.relation.usecase'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import DeliveryPrismaRepository from '../../../../src/core/delivery/infrastructure/delivery.prisma.repository'
import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import PaymentPrismaRepository from '../../../../src/core/payment/infrastructure/payment.prisma.repository'

import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import { CreditRequestStatusType } from '../../../../src/core/credit-request/domain/credit.request.status.type'
import CreditRequestList from '../../../../src/core/credit-request/domain/credit.request.list.model'
import DeliveryListModel from '../../../../src/core/delivery/domain/delivery.list.model'
import Campaign from '../../../../src/core/campaign/domain/campaign.model'
import PaymentListModel from '../../../../src/core/payment/domain/payment.list.model'

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
        farmerId: '1'
      },
      {
        creditRequestId: '1288823',
        campaignId: 'ARR012023',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        creditAmount: 1000,
        createDateTime: new Date(),
        updateStatusDateTime: new Date(),
        creditRequestStatus: 'Rechazado',
        farmerId: '1'
      },
      {
        creditRequestId: '1288824',
        campaignId: 'ARR012023',
        fullNames: 'EZNO GIULIANO VILLANUEVA MENDEZ',
        creditAmount: 1000,
        createDateTime: new Date(),
        updateStatusDateTime: new Date(),
        creditRequestStatus: 'Rechazado',
        farmerId: '1'
      },
    ],
    count: 3
  }

  const mockDeliveryList: DeliveryListModel[] = [
    {
      deliveryId: 1,
      fullNames: "Josue Emmanuel Medina Garcia",
      deliveryDateTime: new Date(),
      providerDescription: "BANCO DE LA NACIÓN",
      financialSourceDescription: "Recuperaciones M.E.",
      currentAccountDescription: "Descriptiuon",
      gloss: "RELACION GIROS 001",
      deliveryAmount: 14400
    },
    {
      deliveryId: 2,
      fullNames: "Josue Emmanuel Medina Garcia",
      deliveryDateTime: new Date(),
      providerDescription: "BANCO DE LA NACIÓN",
      financialSourceDescription: "Recuperaciones M.E.",
      currentAccountDescription: "Descriptiuon",
      gloss: "RELACION GIROS 002",
      deliveryAmount: 14
    },
    {
      deliveryId: 3,
      fullNames: "Josue Emmanuel Medina Garcia",
      deliveryDateTime: new Date(),
      providerDescription: "BANCO DE LA NACIÓN",
      financialSourceDescription: "Recuperaciones M.E.",
      currentAccountDescription: "Descriptiuon",
      gloss: "RELACION GIROS 001",
      deliveryAmount: 1440
    },
  ]

  const campaignMock: Campaign = {
    campaignId: 'ARR012023',
    campaignDescription: 'Arroz 2023',
    campaignYear: '2023',
    periodName: 'Periodo 1',
    startDate: '02/10',
    finishDate: '03/11',
    campaignDelinquentInterest: 1,
    campaignInterest: 1,
    campaignTypeId: 1
  }

  const mockPaymentList: PaymentListModel[] = [
    {
      "paymentId": 1,
      "fullNames": "Martin Perez",
      "paymentDateTime": new Date(),
      "financialSourceDescription": "Recuperaciones M.E.",
      "currentAccountDescription": "007251-1-32",
      "paymentDescription": "RELACION ABONOS 001",
      "paymentAmount": 100
    },
    {
      "paymentId": 2,
      "fullNames": "Martin Perez",
      "paymentDateTime": new Date(),
      "financialSourceDescription": "Recuperaciones M.E.",
      "currentAccountDescription": "007251-1-32",
      "paymentDescription": "RELACION ABONOS 001",
      "paymentAmount": 100
    },
    {
      "paymentId": 3,
      "fullNames": "Martin Perez",
      "paymentDateTime": new Date(),
      "financialSourceDescription": "Recuperaciones M.E.",
      "currentAccountDescription": "007251-1-32",
      "paymentDescription": "RELACION ABONOS 001",
      "paymentAmount": 100
    }
  ]

  let creditRequestPersistanceRepository: CreditRequestPrismaRepository
  let deliveryPrismaRepository: DeliveryPrismaRepository
  let campaignPrismaRepository: CampaignPrismaRepository
  let paymentPrismaRepository: PaymentPrismaRepository

  let listCreditRelationUseCase: ListCreditRelationUseCase

  beforeAll(() => {
    creditRequestPersistanceRepository = new CreditRequestPrismaRepository()
    deliveryPrismaRepository = new DeliveryPrismaRepository()
    campaignPrismaRepository = new CampaignPrismaRepository()
    paymentPrismaRepository = new PaymentPrismaRepository()

  })

  beforeEach(() => {
    jest.spyOn(creditRequestPersistanceRepository, 'listCreditRequest').mockResolvedValue(mockCreditRequestList)
    jest.spyOn(deliveryPrismaRepository, 'listDeliveriesByCreditRequestId').mockResolvedValue(mockDeliveryList)
    jest.spyOn(campaignPrismaRepository, 'getCampaignById').mockResolvedValue(campaignMock)
    jest.spyOn(paymentPrismaRepository, 'listPaymentsByCreditRequestId').mockResolvedValue(mockPaymentList)


    listCreditRelationUseCase = new ListCreditRelationUseCase(
      creditRequestPersistanceRepository,
      deliveryPrismaRepository,
      campaignPrismaRepository,
      paymentPrismaRepository
    )
  })

  describe('OPERATION SUCCESS', () => {
    test('List indiivduals farmers successfully', async () => {
      const creditRequests = await listCreditRelationUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.INDIVIDUAL,
        farmerFullNames: "Josue", 
        page: 1,
        limit: 0
      })

      expect(creditRequests.creditRelations.length).toBe(3)
      expect(creditRequests.count).toBe(3)
    })

    test('List indiivduals farmers successfully', async () => {
      const creditRequests = await listCreditRelationUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.ALL, 
        farmerFullNames: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRelations.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })

    test('List asociation farmers successfully', async () => {
      const creditRequests = await listCreditRelationUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.ASSOCIATION,
        farmerSocialReason: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRelations.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })

    test('List asociation farmers successfully', async () => {
      const creditRequests = await listCreditRelationUseCase.list({
        campaignId: 'ARR012023',
        farmerType: FarmerType.ALL,
        farmerSocialReason: "Josue", 
        page: 1,
        limit: 2
      })

      expect(creditRequests.creditRelations.length).toBe(2)
      expect(creditRequests.count).toBe(3)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await listCreditRelationUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.ASSOCIATION,
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
        await listCreditRelationUseCase.list({
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

    test('Should throw bad request error when no send full names', async () => {
      try {
        await listCreditRelationUseCase.list({
          campaignId: 'ARR012023',
          farmerType: FarmerType.INDIVIDUAL,
          page: 1,
          limit: 2
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })

    test('Should throw bad request error when no send social reason', async () => {
      try {
        await listCreditRelationUseCase.list({
          campaignId: 'ARR012023',
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