import CampaignTypePrismaRepository from '../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository'
import ListPeriodByCampaignType from '../../../../src/core/campaing-type/application/list.period.by.campaign.type'
import CampaignType from '../../../../src/core/campaing-type/domain/campaign.type.model'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'

jest.mock("../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository")

describe('List periods by campaign module test suites', () => { 
  
  const mockParameter = 1

  const mockCampaingTypeResponse = {
    campaignTypeId: 1,
    campaignTypeDescription: 'ARROZ',
    periodQuantity: 2
  }

  const mockListPeriodResponse = ['Periodo 1', 'Periodo 2']

  let campaignTypePrismaRepository: CampaignTypePrismaRepository
  let spyCampaignType: jest.SpyInstance<Promise<CampaignType | null>, [campaignTypeId: number], any>
  let listPeriodByCampaignType: ListPeriodByCampaignType

  beforeAll(() => {
    campaignTypePrismaRepository = new CampaignTypePrismaRepository()
  })

  beforeEach(() => {
    spyCampaignType = jest.spyOn(campaignTypePrismaRepository, 'getCampaignTypeById')

    listPeriodByCampaignType= new ListPeriodByCampaignType(campaignTypePrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    
    test('When list periods successfully', async () => {
      spyCampaignType.mockResolvedValue(mockCampaingTypeResponse)

      const periodList = await listPeriodByCampaignType.list({campaignTypeId: mockParameter})

      expect(periodList).toStrictEqual(mockListPeriodResponse)
    })

  })

  describe('PROCESS ERROR', () => {
    
    test('When campaign type is not found', async () => {
      spyCampaignType.mockResolvedValue(null)

      await expect(listPeriodByCampaignType.list({campaignTypeId: mockParameter})).rejects.toBeInstanceOf(ProcessError)
    })
    
  })
})