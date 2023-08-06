import CreditRequestListApproved from "../../../../src/core/credit-request/domain/credit.request.list.approved"

export const creditRequestPrimaRepositoryMock = {
  listCreditRequestByCampaignId: jest.fn(),
  getNumberOfCreditRequestByFarmer: jest.fn(),
  listCreditRequest: jest.fn(),
  createCreditRequest: jest.fn(),
  getCreditRequestByFarmerId: jest.fn(),
  getCreditRequestById: jest.fn(),
  updateCreditRequestStatusById: jest.fn(),
  listApprovedCreditRequestByFarmerId: jest.fn()
}

export const paramsMock = {
  farmerId: '3.1.2',
  campaignId: 'ARR022023'
}

export const creditRequestFoundMock: CreditRequestListApproved[] = [
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    creditAmount: 2000,
    createDateTime: new Date('20/02/2023')
  },
  {
    creditRequestId: "6dea515e-4255-438b-a7e7-c2de65718c23",
    creditAmount: 2000,
    createDateTime: new Date('20/02/2023')
  }
]