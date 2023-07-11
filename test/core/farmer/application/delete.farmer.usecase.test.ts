import DeleteFarmerUseCase from '../../../../src/core/farmer/application/delete.farmer.usecase'
import FarmerPrismaRepository from '../../../../src/core/farmer/infrastructure/farmer.prisma.repository'
import CreditRequestPrismaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { FarmerDetail } from '../../../../src/core/farmer/domain/farmer.detail.model'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")
jest.mock("../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository")

describe('Delete farmer module test suites', () => {
  const mockFarmer: FarmerDetail = {
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
  let creditRequestPrismaRepository: CreditRequestPrismaRepository
  let deleteFarmerUseCase: DeleteFarmerUseCase

  beforeAll(() => {
    farmerPrismaRepository = new FarmerPrismaRepository()
    creditRequestPrismaRepository = new CreditRequestPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(creditRequestPrismaRepository, 'getNumberOfCreditRequestByFarmer').mockResolvedValue(0)
    jest.spyOn(farmerPrismaRepository, 'getFarmerById').mockResolvedValue(mockFarmer)
    jest.spyOn(farmerPrismaRepository, 'deleteFarmerById').mockResolvedValue('3.1.10')

    deleteFarmerUseCase = new DeleteFarmerUseCase(farmerPrismaRepository, creditRequestPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Delete a farmer successfully', async () => {
      const message = await deleteFarmerUseCase.delete({ farmerId: '3.1.10' })

      expect(message).toBe('El agricultor con código 3.1.10 ha sido eliminado con éxito')
    })
  })

  describe('PROCESS ERROR', () => {
    test('Should throw process error when farmer has credit request', async () => {
      jest.spyOn(creditRequestPrismaRepository, 'getNumberOfCreditRequestByFarmer').mockResolvedValue(1)

      try {
        await deleteFarmerUseCase.delete({ farmerId: '3.1.10' })
      } catch (error) {
        expect(error).toBeInstanceOf(ProcessError)
      }
    })

    test('Should throw process error when farmer no exists', async () => {
      jest.spyOn(farmerPrismaRepository, 'getFarmerById').mockResolvedValue(null)

      try {
        await deleteFarmerUseCase.delete({ farmerId: '3.1.10' })
      } catch (error) {
        expect(error).toBeInstanceOf(ProcessError)
      }
    })
  })
})
