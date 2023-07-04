import CampaignList from '../../../../src/core/campaign/domain/campaign.list.model'
import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import ListCampaign from '../../../../src/core/campaign/application/list.campaign.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository")

describe('List Campaign module test suites', () => {

  const mockListCampaingParameters = {
    campaignId: '1',
    campaignYear: '2023',
    page: 1, 
    limit: 2, 
  }
  
  const mockListResponse = {
    campaign: [
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
    ],
    count: 2
  }

  let campaignPrismaRepository: CampaignPrismaRepository
  let spyListById: jest.SpyInstance<Promise<{
    campaign: CampaignList[];
    count: number;
}>, [campaignId: string], any>
  let spyListByYear: jest.SpyInstance<Promise<{
    campaign: CampaignList[];
    count: number;
}>, [campaignId: string], any>
  let spyListAll: jest.SpyInstance<Promise<{
    campaign: CampaignList[];
    count: number;
}>, [], any>
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

      const campaignListAll = await listCampaign.invoke({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'all'
      })

      expect(campaignListAll.campaign).toHaveLength(2)
    })

    test('When list campaigns by ID successfully', async () => {
      spyListById.mockResolvedValue(mockListResponse)

      const campaignListById = await listCampaign.invoke({
        campaignId: mockListCampaingParameters.campaignId, 
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'code'
      })

      expect(campaignListById.campaign).toHaveLength(2)
    })


    test('When list campaigns by year successfully', async () => {
      spyListByYear.mockResolvedValue(mockListResponse)

      const campaignListByYear = await listCampaign.invoke({
        campaignYear: mockListCampaingParameters.campaignYear, 
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'year'
      })

      expect(campaignListByYear.campaign).toHaveLength(2)
    })

  }) 

  describe('BAD REQUEST ERROR', () => {

    test('When campaignId is missing', async () => {
      await expect(listCampaign.invoke({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'code'
      })).rejects.toBeInstanceOf(BadRequestError)
    })


    test('When campaignYear is missing', async () => {
      await expect(listCampaign.invoke({
        page: mockListCampaingParameters.page, 
        limit: mockListCampaingParameters.limit, 
        typeSearch: 'year'
      })).rejects.toBeInstanceOf(BadRequestError)
    })

  }) 
})