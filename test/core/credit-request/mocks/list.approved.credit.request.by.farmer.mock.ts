import CreditRequestCreate from "../../../../src/core/credit-request/domain/credit.request.create.model"

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

export const farmerIdMock = '3.1.2'

export const creditRequestFoundMock: CreditRequestCreate[] = [
  {
    creditRequestId: "c30a928d-e352-4281-a8d8-b1e115dd298b",
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestStatus: "Aprobado",
    creditRequestObservation: "test v3"
  },
  {
    creditRequestId: "c30a928d-e352-4281-a8d8-b1e115dd298b",
    farmerId: "4.2.1",
    campaignId: "ARR012023",
    hectareNumber: 5,
    creditReason: "test",
    creditAmount: 2000,
    guaranteeDescription: "test v2",
    guaranteeAmount: 5000,
    technicalId: 1,
    creditRequestStatus: "Aprobado",
    creditRequestObservation: "test v3"
  }
]