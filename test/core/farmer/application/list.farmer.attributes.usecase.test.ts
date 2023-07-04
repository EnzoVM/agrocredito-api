import ListFarmerAttributesUseCase from '../../../../src/core/farmer/application/list.farmer.attributes.usecase'
import FarmerAttributes from '../../../../src/core/farmer/domain/farmer.attributes.model'
import FarmerPrismaRepository from '../../../../src/core/farmer/infrastructure/farmer.prisma.repository'

jest.mock("../../../../src/core/farmer/infrastructure/farmer.prisma.repository")

describe('Create Campaign module test suites', () => {
  const mockFarmerAttributes: FarmerAttributes = {
    farmerQualities: [
      {
        farmerQualityId: 1,
        farmerQualityDescription: 'Hi'
      }
    ],
    propertyLegalConditions: [
      {
        propertyLegalConditionId: 1,
        propertyLegalConditionDescription: 'Across'
      }
    ]
  }

  let farmerPrismaRepository: FarmerPrismaRepository
  let listFarmerAttributesUseCase: ListFarmerAttributesUseCase

  beforeAll(() => {
    farmerPrismaRepository = new FarmerPrismaRepository()
  })

  beforeEach(() => {
    jest.spyOn(farmerPrismaRepository, 'getFarmerAttributes').mockResolvedValue(mockFarmerAttributes)

    listFarmerAttributesUseCase = new ListFarmerAttributesUseCase(farmerPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Create a farmer successfully', async () => {
      const farmerAttributes = await listFarmerAttributesUseCase.list()

      expect(farmerAttributes.farmerQualities[0].farmerQualityDescription).toBe(mockFarmerAttributes.farmerQualities[0].farmerQualityDescription)
      expect(farmerAttributes.propertyLegalConditions[0].propertyLegalConditionDescription).toBe(mockFarmerAttributes.propertyLegalConditions[0].propertyLegalConditionDescription)
    })
  })
})
