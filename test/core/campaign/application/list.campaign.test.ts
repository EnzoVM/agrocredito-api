import CampaignList from '../../../../src/core/campaign/domain/campaign.list.model'
import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import ListCampaign from '../../../../src/core/campaign/application/list.campaign'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository")

describe('List Campaign module test suites', () => {

  const mockListCampaingParameters = {
    campaignId: '1',
    campaignYear: '2023',
    page: 1, 
    limit: 2, 
  }
  
  const mockListResponse = [
    {
      campaignId: 'ARR012023',
      campaignDescription: 'Arroz 2023',
      campaignTypeDescription: 'Arroz',
      campaignYear: '2023',
      periodName: 'Periodo 1',
      startDate: '02/10',
      finishDate: '03/11'
    },
    {
      campaignId: 'ARR012023',
      campaignDescription: 'Arroz 2023',
      campaignTypeDescription: 'Arroz',
      campaignYear: '2023',
      periodName: 'Periodo 1',
      startDate: '02/10',
      finishDate: '03/11'
    },
  ]

  let campaignPrismaRepository: CampaignPrismaRepository
  let spyListById: jest.SpyInstance<Promise<CampaignList[]>, [campaignId: string], any>
  let spyListByYear: jest.SpyInstance<Promise<CampaignList[]>, [campaignYear: string], any>
  let spyListAll: jest.SpyInstance<Promise<CampaignList[]>, [], any>
  let listCampaign: ListCampaign

  beforeAll(() => {
    campaignPrismaRepository = new CampaignPrismaRepository()
  })

  beforeEach(() => {
    spyListById = jest.spyOn(campaignPrismaRepository, 'listCampaignById')
    spyListByYear = jest.spyOn(campaignPrismaRepository, 'listCampaignByYear')
    spyListAll = jest.spyOn(campaignPrismaRepository, 'listCampaign')

    listCampaign = new ListCampaign(campaignPrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {

    test('When list all campaigns successfully', async () => {
      spyListAll.mockResolvedValue(mockListResponse)

      const campaignListAll = await listCampaign.list({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'all'
      })

      expect(campaignListAll).toHaveLength(2)
    })

    test('When list campaigns by ID successfully', async () => {
      spyListById.mockResolvedValue(mockListResponse)

      const campaignListById = await listCampaign.list({
        campaignId: mockListCampaingParameters.campaignId, 
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'code'
      })

      expect(campaignListById).toHaveLength(2)
    })


    test('When list campaigns by year successfully', async () => {
      spyListByYear.mockResolvedValue(mockListResponse)

      const campaignListByYear = await listCampaign.list({
        campaignYear: mockListCampaingParameters.campaignYear, 
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'year'
      })

      expect(campaignListByYear).toHaveLength(2)
    })

  }) 

  describe('BAD REQUEST ERROR', () => {

    test('When campaignId is missing', async () => {
      await expect(listCampaign.list({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'code'
      })).rejects.toBeInstanceOf(BadRequestError)
    })


    test('When campaignYear is missing', async () => {
      await expect(listCampaign.list({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'year'
      })).rejects.toBeInstanceOf(BadRequestError)
    })

  }) 
})