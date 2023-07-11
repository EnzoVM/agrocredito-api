import CampaignPrismaRepository from '../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository'
import CreditRequestPrimaRepository from '../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository'
import DeleteCampaing from '../../../../src/core/campaign/application/delete.campaign.usecase'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import CreditRequest from '../../../../src/core/credit-request/domain/credit.request.model'

jest.mock("../../../../src/core/campaign/infraestructure/prisma/campaign.prisma.repository")
jest.mock("../../../../src/core/credit-request/infrastructure/credit.request.prisma.repository")

describe('Delete Campaign module test suites', () => {

  const mockCampaignId = 'ARRO012023'
  
  const mockCreditResponse = {
    creditRequestId: '1',
    farmerId: '1',
    campaignId: '1',
    hectareNumber: 5 ,
    creditReason: 'ddd',
    creditAmount: 10,
    guaranteeDescription: 'ffff',
    guaranteeAmount: 3,
    tecniqueId: 3,
    creditRequestStatus: 'Pendiente',
    creditRequestObservation: 'ff3f'
  }

  let campaignPrismaRepository: CampaignPrismaRepository
  let creditRequestPrimaRepository: CreditRequestPrimaRepository
  let deleteCampaign: DeleteCampaing
  let spyDeleteCampaing: jest.SpyInstance<Promise<string>, [campaignId: string], any>
  let spyCreditRequest: jest.SpyInstance<Promise<CreditRequest[]>, [campaignId: string], any>

  beforeAll(() => {
    campaignPrismaRepository = new CampaignPrismaRepository()
    creditRequestPrimaRepository = new CreditRequestPrimaRepository()
  })

  beforeEach(() => {
    spyDeleteCampaing = jest.spyOn(campaignPrismaRepository, 'deleteCampaign')
    spyCreditRequest = jest.spyOn(creditRequestPrimaRepository, 'listCreditRequestByCampaignId')

    deleteCampaign = new DeleteCampaing(campaignPrismaRepository, creditRequestPrimaRepository)
  })

  describe('OPERATION SUCCESS', () => {

    test('When campaign is deleted successfully', async () => {
      spyCreditRequest.mockResolvedValue([])
      spyDeleteCampaing.mockResolvedValue('The Campaign was deleted')

      const campaingDeleted = await deleteCampaign.invoke({campaignId: mockCampaignId})

      expect(campaingDeleted).toStrictEqual('The Campaign was deleted')
    })

  })

  describe('PROCESS ERROR', () => {

    test('when there are credit request', async () => {
      spyCreditRequest.mockResolvedValue([mockCreditResponse])

      await expect(deleteCampaign.invoke({campaignId: mockCampaignId})).rejects.toBeInstanceOf(ProcessError)
    })

  })
})

