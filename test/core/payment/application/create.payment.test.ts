import CreatePaymentUseCase from '../../../../src/core/payment/application/create.payment.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import { 
  paymentPrismaRepositoryMock,
  campaignPrismaRepositoryMock,
  creditRequestPrimaRepositoryMock,
  paramMock,
  paramEmptyMock,
  paramWrongMock,
  creditRequestFoundMock,
  campaignFoundMock,
  paymentFoundMock,
  paymentAddedMock
} from '../mocks/create.payment.mock'

const createPaymentUseCase = new CreatePaymentUseCase(paymentPrismaRepositoryMock, creditRequestPrimaRepositoryMock, campaignPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a payment object', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(creditRequestFoundMock)
    campaignPrismaRepositoryMock.getCampaignById.mockResolvedValue(campaignFoundMock)
    paymentPrismaRepositoryMock.listPaymentsByCreditRequestId.mockResolvedValue(paymentFoundMock)
    paymentPrismaRepositoryMock.createPayment.mockResolvedValue(paymentAddedMock)

    const paymentAdded = await createPaymentUseCase.invoke(paramMock)
    
    expect(paymentAdded).toEqual(paymentAddedMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an error when credit request is not found', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(null)

    await expect(createPaymentUseCase.invoke(paramMock)).rejects.toThrowError('La solicitud de crédito especificado no existe')
    await expect(createPaymentUseCase.invoke(paramMock)).rejects.toBeInstanceOf(NotFoundError)
  })

  test('Should return an error when campaign is not found', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(creditRequestFoundMock)
    campaignPrismaRepositoryMock.getCampaignById.mockResolvedValue(null)

    await expect(createPaymentUseCase.invoke(paramMock)).rejects.toThrowError('No se ha encontrado una campaña asociada')
    await expect(createPaymentUseCase.invoke(paramMock)).rejects.toBeInstanceOf(NotFoundError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when some parameters are empty', async () => {
    for(const param of paramEmptyMock){
      //@ts-ignore
      await expect(createPaymentUseCase.invoke(param)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createPaymentUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when some parameters are wrong', async () => {
    for(const param of paramWrongMock){
      //@ts-ignore
      await expect(createPaymentUseCase.invoke(param)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createPaymentUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })
})