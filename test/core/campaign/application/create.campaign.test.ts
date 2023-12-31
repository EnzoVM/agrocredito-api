import Campaign from '../../../../src/core/campaign/domain/campaign.model'
import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import CampaignType from '../../../../src/core/campaing-type/domain/campaign.type.model'
import CampaignTypePrismaRepository from '../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import CreateCampaign from './../../../../src/core/campaign/application/create.campaign.usecase'

jest.mock("../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository")
jest.mock("../../../../src/core/campaing-type/infrastructure/campaign.type.prisma.repository")

describe('Create Campaign module test suites', () => {

  const mockParamaters = {
    campaignDescription: 'Arroz 2023',
    campaignTypeId: 1,
    campaignYear: '2023',
    periodName: 'Periodo 1',
    startDate: '02/10',
    finishDate: '03/11',
    campaignInterest: 20,
    campaignDelinquentInterest: 25
  }

  const mockCampaingTypeResponse = {
    campaignTypeId: 1,
    campaignTypeDescription: 'ARROZ',
    periodQuantity: 3
  }

  const mockCampaignArrayResponse = [
    {
      campaignId: 'ARR012023',
      campaignDescription: 'Arroz 2023',
      campaignTypeId: 1,
      campaignYear: '2023',
      periodName: 'Periodo 1',
      startDate: '02/10',
      finishDate: '03/11',
      campaignInterest: 20,
      campaignDelinquentInterest: 25
    },
    {
      campaignId: 'ARR012023',
      campaignDescription: 'Arroz 2023',
      campaignTypeId: 1,
      campaignYear: '2023',
      periodName: 'Periodo 1',
      startDate: '03/12',
      finishDate: '03/14',
      campaignInterest: 20,
      campaignDelinquentInterest: 25
    }
  ]

  const mockCreateCampaignResponse = {
    campaignId: 'ARR012023',
    campaignDescription: 'Arroz 2023',
    campaignTypeId: 1,
    campaignYear: '2023',
    periodName: 'Periodo 1',
    startDate: '02/10',
    finishDate: '03/11',
    campaignInterest: 25,
    campaignDelinquentInterest: 30
  }

  let campaignPrismaRepository: CampaignPrismaRepository
  let campaignTypePrismaRepository: CampaignTypePrismaRepository
  let spyCampaignType: jest.SpyInstance<Promise<CampaignType | null>, [campaignTypeId: number], any>
  let spyGetCampaign: jest.SpyInstance<Promise<Campaign[]>, [campaignYear: string, campaignTypeId: number], any>
  let spyCreateCampaign: jest.SpyInstance<Promise<Campaign>, [campaign: Campaign], any>
  let createCampaign : CreateCampaign

  beforeAll(() => {
    campaignPrismaRepository = new CampaignPrismaRepository()
    campaignTypePrismaRepository = new CampaignTypePrismaRepository()
  })

  beforeEach(() => {
    spyCampaignType = jest.spyOn(campaignTypePrismaRepository, 'getCampaignTypeById')
    spyGetCampaign = jest.spyOn(campaignPrismaRepository, 'getCampaignByYearAndType')
    spyCreateCampaign = jest.spyOn(campaignPrismaRepository, 'createCampaign')

    createCampaign= new CreateCampaign(campaignPrismaRepository, campaignTypePrismaRepository)
  })

  describe('OPERATION SUCCESS', () => {

    test('When create a campaign successfully', async () => {
      spyCampaignType.mockResolvedValue(mockCampaingTypeResponse)
      spyGetCampaign.mockResolvedValue([])
      spyCreateCampaign.mockResolvedValue(mockCreateCampaignResponse)

      const campaignCreated = await createCampaign.invoke(mockParamaters)

      expect(campaignCreated.campaignId).toStrictEqual('ARR012023')
      expect(campaignCreated.campaignYear).toStrictEqual('2023')
    })

  })

  describe('BAD REQUEST ERROR ', () => {

    test('When campaign type is not found', async () => {
      spyCampaignType.mockResolvedValue(null)

      await expect(createCampaign.invoke(mockParamaters)).rejects.toBeInstanceOf(BadRequestError)
    })

    test('When start date is grater than finish date', async () => {
      await expect(createCampaign.invoke({
        campaignDescription: 'Arroz 2023',
        campaignTypeId: 1,
        campaignYear: '2023',
        startDate: '02/13',
        finishDate: '02/11',
        campaignInterest: 20,
        campaignDelinquentInterest: 30
      })).rejects.toBeInstanceOf(BadRequestError)
    })
    
  })

  describe('PROCESS ERROR', () => {

    test('when the number of campaigns is greater than the number of periods', async () => {
      spyCampaignType.mockResolvedValue({
        campaignTypeId: 1,
        campaignTypeDescription: 'ARROZ',
        periodQuantity: 2
      })
      spyGetCampaign.mockResolvedValue(mockCampaignArrayResponse)
      
      await expect(createCampaign.invoke(mockParamaters)).rejects.toBeInstanceOf(ProcessError)
    })

    test('when the finish date is greater than start date of the new campaign', async () => {   
      spyCampaignType.mockResolvedValue(mockCampaingTypeResponse)
      spyGetCampaign.mockResolvedValue(mockCampaignArrayResponse)
   
      await expect(createCampaign.invoke({
        campaignDescription: 'Arroz 2023',
        campaignTypeId: 1,
        campaignYear: '2023',
        startDate: '03/12',
        finishDate: '05/12',
        campaignInterest: 20,
        campaignDelinquentInterest: 30
      })).rejects.toBeInstanceOf(ProcessError)
    })
    
  })
})