import ListDeliveryUseCase from '../../../../src/core/delivery/application/list.delivery.usecase'
import DeliveryListModel from '../../../../src/core/delivery/domain/delivery.list.model'
import { FarmerType } from '../../../../src/core/farmer/domain/farmer.type'
import DeliveryPrismaRepository from '../../../../src/core/delivery/infrastructure/delivery.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/delivery/infrastructure/delivery.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockDeliveryList: {
    deliveries: DeliveryListModel[], 
    count: number,
    totalAmount: number
  } = {
    deliveries: [
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
    ],
    count: 3,
    totalAmount: 10
  }

  let deliveryPrismaRepository: DeliveryPrismaRepository
  let listDeliveryUseCase: ListDeliveryUseCase

  beforeAll(() => {
    deliveryPrismaRepository = new DeliveryPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(deliveryPrismaRepository, 'listDeliveries').mockResolvedValue(mockDeliveryList)
    jest.spyOn(deliveryPrismaRepository, 'getTotalAmountByCampaignId').mockResolvedValue(10)

    listDeliveryUseCase = new ListDeliveryUseCase(deliveryPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('List deliveries by individual farmer type successfully', async () => {
      const deliveries = await listDeliveryUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.INDIVIDUAL,
        fullNames: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(deliveries.deliveries.length).toBe(3)
      expect(deliveries.count).toBe(3)
    })

    test('List deliveries by individual farmer type successfully', async () => {
      const deliveries = await listDeliveryUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.ASSOCIATION,
        socialReason: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(deliveries.deliveries.length).toBe(3)
      expect(deliveries.count).toBe(3)
    })

    test('List deliveries by individual farmer type successfully', async () => {
      const deliveries = await listDeliveryUseCase.list({
        campaignId: 'a',
        farmerType: FarmerType.ALL,
        socialReason: 'Josue Medina', 
        page: 1,
        limit: 0
      })

      expect(deliveries.deliveries.length).toBe(3)
      expect(deliveries.count).toBe(3)
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when send no required data', async () => {
      try {
        // @ts-ignore
        await listDeliveryUseCase.list({
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
        await listDeliveryUseCase.list({
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
        await listDeliveryUseCase.list({
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
        await listDeliveryUseCase.list({
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