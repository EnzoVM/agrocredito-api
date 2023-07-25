import ListDepartureDetailByCampaignId from '../../../../src/core/departure-detail/application/list.departure.detail.by.campaign.id.usecase'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  departureDetailPrismaRepositoryMock,
  campaignIdMock,
  departureDetailFoundMock
} from '../mocks/list.depature.detail.by.campaign.id.usecase.mock'

const listDepartureDetailByCampaignId = new ListDepartureDetailByCampaignId(departureDetailPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a list departure details successfully', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(departureDetailFoundMock)
    const departureDetailList = await listDepartureDetailByCampaignId.invoke({campaignId: campaignIdMock})
    
    expect(departureDetailList).toEqual(departureDetailFoundMock)
  })
})

describe('Process Error', () => {
  test('Should throw an error when there are not delivery plan model and departure detail', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(null)

    await expect(listDepartureDetailByCampaignId.invoke({campaignId: campaignIdMock})).rejects.toThrowError('Debe de crear un modelo de plan de entregas y una partida')
    await expect(listDepartureDetailByCampaignId.invoke({campaignId: campaignIdMock})).rejects.toBeInstanceOf(ProcessError)
  })

  test('Should throw an error when there is not a departure detail', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue([])

    await expect(listDepartureDetailByCampaignId.invoke({campaignId: campaignIdMock})).rejects.toThrowError('Debe de crear una partida como mínimo')
    await expect(listDepartureDetailByCampaignId.invoke({campaignId: campaignIdMock})).rejects.toBeInstanceOf(ProcessError)
  })
})