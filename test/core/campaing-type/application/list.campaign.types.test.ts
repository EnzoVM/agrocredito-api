import CampaignTypePrismaRepository from '../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository'
import ListCampaignTypes from '../../../../src/core/campaing-type/application/list.campaign.types'
import CampaignType from '../../../../src/core/campaing-type/domain/campaign.type.model'

jest.mock("../../../../src/core/campaing-type/application/list.campaign.types")

describe('List periods by campaign module test suites', () => { 

  const mockCampaingTypeResponse = [
    {
      campaignTypeId: 1,
      campaignTypeDescription: 'ARROZ',
      periodQuantity: 2
    },
    {
      campaignTypeId: 2,
      campaignTypeDescription: 'Choclo',
      periodQuantity: 3
    }
  ]
  
  let campaignTypePrismaRepository: CampaignTypePrismaRepository
  let spyCampaignType: jest.SpyInstance<Promise<CampaignType[]>, [], any>
  let listCampaignTypes: ListCampaignTypes

  beforeAll(() => {
    campaignTypePrismaRepository = new CampaignTypePrismaRepository()
  })

  beforeEach(() => {
    spyCampaignType = jest.spyOn(campaignTypePrismaRepository, 'listCampaignType')

    listCampaignTypes= new ListCampaignTypes(campaignTypePrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {
    
    test('When list periods successfully', async () => {
      spyCampaignType.mockResolvedValue(mockCampaingTypeResponse)

      const periodList = await listCampaignTypes.list()

      expect(periodList).toHaveLength(2)
    })

  })
})