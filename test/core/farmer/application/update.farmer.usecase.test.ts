import UpdateFarmerUseCase from '../../../../src/core/farmer/application/update.farmer.usecase'
import { FarmerDetail } from '../../../../src/core/farmer/domain/farmer.detail.model'
import FarmerPrismaRepository from '../../../../src/core/farmer/infrastructure/farmer.prisma.repository'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {

  const mockFarmerDetail: FarmerDetail = {
    farmerId: '3.17.1',
    propertySector: 'Tumbes',
    propertyProject: 'Tumbes',
    correlative: 1,
    farmerQuality: 'Bueno',
    farmerType: 'Individual',
    fullNames: 'JOSUE EMMANUEL MEDINA GARCÍA',
    dni: '12345678',
    propertyLocation: 'Panamericana sur',
    propertyLegalCondition: 'Titulado',
    cadastralRegistry: '374847984793WW',
    farmerAddress: 'Av. Tumbes 2034',
    farmerProject: 'Tumbes',
    propertyHectareQuantity: 10
  }

  let farmerPrismaRepository: FarmerPrismaRepository
  let updateFarmerUseCase: UpdateFarmerUseCase

  beforeAll(() => {
    farmerPrismaRepository = new FarmerPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(farmerPrismaRepository, 'getFarmerById').mockResolvedValue(mockFarmerDetail)
    jest.spyOn(farmerPrismaRepository, 'updateFarmerById').mockResolvedValue(mockFarmerDetail)

    updateFarmerUseCase = new UpdateFarmerUseCase(farmerPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Create a farmer successfully', async () => {
      const message = await updateFarmerUseCase.update({ farmerId: '12' })

      expect(message).toMatch(`El agricultor`)
    })
  })

  describe('NOT FOUND', () => {
    test('Should throw not found error when farmer doest not exists', async () => {
      jest.spyOn(farmerPrismaRepository, 'getFarmerById').mockResolvedValue(null)

      try {
        await updateFarmerUseCase.update({ farmerId: '12' })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
})
