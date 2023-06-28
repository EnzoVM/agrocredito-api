import CampaignTypePrismaRepository from '../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository'
import ListCampaignTypes from '../../../../src/core/campaing-type/application/list.campaign.types'
import CampaignType from '../../../../src/core/campaing-type/domain/campaign.type.model'

jest.mock("../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository")

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
  let spyListCampaignType: jest.SpyInstance<Promise<CampaignType[]>, [], any>
  let listCampaignTypes: ListCampaignTypes

  beforeAll(() => {
    campaignTypePrismaRepository = new CampaignTypePrismaRepository()
  })

  beforeEach(() => {
    spyListCampaignType = jest.spyOn(campaignTypePrismaRepository, 'listCampaignType')

    listCampaignTypes= new ListCampaignTypes(campaignTypePrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {

    test('When list campaign types successfully', async () => {
      spyListCampaignType.mockResolvedValue(mockCampaingTypeResponse)

      const campaignList = await listCampaignTypes.list()
      console.log(campaignList);
      
      expect(campaignList).toHaveLength(2)
    })

  })
})