import CreateDeliveryUseCase from '../../../../src/core/delivery/application/create.delivery.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import NotFoundError from '../../../../src/utils/custom-errors/application-errors/not.found.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  deliveryPrismaRepositoryMock,
  creditRequestPrimaRepositoryMock,
  creditRequestFoundMock,
  deliveriesFoundMock,
  deliveryAddedMock,
  paramEmptyMock,
  paramMock,
  paramWrongMock
} from '../mocks/create.delivery.mock'

const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryPrismaRepositoryMock, creditRequestPrimaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a delivery object', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(creditRequestFoundMock)
    deliveryPrismaRepositoryMock.countDeliveriesByCreditRequestId.mockResolvedValue(deliveriesFoundMock)
    deliveryPrismaRepositoryMock.createDelivery.mockResolvedValue(deliveryAddedMock)

    const deliveryAdded = await createDeliveryUseCase.invoke(paramMock)
    
    expect(deliveryAdded).toEqual(deliveryAddedMock)
  })

  test('Should return a delivery object', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(creditRequestFoundMock)
    deliveryPrismaRepositoryMock.countDeliveriesByCreditRequestId.mockResolvedValue(1)
    deliveryPrismaRepositoryMock.createDelivery.mockResolvedValue(deliveryAddedMock)

    const deliveryAdded = await createDeliveryUseCase.invoke(paramMock)
    
    expect(deliveryAdded).toEqual(deliveryAddedMock)
  })
})

describe('NOT FOUND ERROR', () => {
  test('Should return an error when credit request is not found', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(null)

    await expect(createDeliveryUseCase.invoke(paramMock)).rejects.toThrowError('La solicitud de crédito especificado no existe')
    await expect(createDeliveryUseCase.invoke(paramMock)).rejects.toBeInstanceOf(NotFoundError)
  })
})

describe('PROCESS ERROR', () => {
  test('Should return an error when there are more than 2 releases associated', async () => {
    creditRequestPrimaRepositoryMock.getCreditRequestById.mockResolvedValue(creditRequestFoundMock)
    deliveryPrismaRepositoryMock.countDeliveriesByCreditRequestId.mockResolvedValue(2)

    await expect(createDeliveryUseCase.invoke(paramMock)).rejects.toThrowError('No se puede realizar más entregas, porque ya se han hecho 2')
    await expect(createDeliveryUseCase.invoke(paramMock)).rejects.toBeInstanceOf(ProcessError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should return an error when some parameters are empty', async () => {
    for (const param of paramEmptyMock){
      //@ts-ignore
      await expect(createDeliveryUseCase.invoke(param)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createDeliveryUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should return an error when some parameters are wrong', async () => {
    for (const param of paramWrongMock){
      //@ts-ignore
      await expect(createDeliveryUseCase.invoke(param)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createDeliveryUseCase.invoke(param)).rejects.toBeInstanceOf(BadRequestError)
    }
  })
})