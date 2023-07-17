import CreateCreditRequestUseCase from '../../../../src/core/credit-request/application/create.credit.request.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import {
  creditRequestPrimaRepositoryMock,
  creditRequestUuidRepositoryMock,
  departureDetailPrismaRepositoryMock,
  farmerPrismaRepositoryMock,
  parameterMock,
  parameterMockWithMoreHectare,
  parameterEmptyMock,
  parameterWrongMock,
  departureDetailFoundMock,
  creditRequestFoundMock,
  farmerFoundMock,
  creditRequestIdMock,
  creditRequestCreatedMock
} from '../mocks/create.credit.request.usecase.mock'

const createCreditRequestUseCase = new CreateCreditRequestUseCase(
  creditRequestPrimaRepositoryMock, 
  creditRequestUuidRepositoryMock, 
  departureDetailPrismaRepositoryMock, 
  farmerPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return an object of credit request', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(departureDetailFoundMock)
    creditRequestPrimaRepositoryMock.getCreditRequestByFarmerId.mockResolvedValue(creditRequestFoundMock)
    farmerPrismaRepositoryMock.getFarmerById.mockResolvedValue(farmerFoundMock)
    creditRequestUuidRepositoryMock.generateCreditRequestId.mockReturnValue(creditRequestIdMock)
    creditRequestPrimaRepositoryMock.createCreditRequest.mockResolvedValue(creditRequestCreatedMock)

    const creditRequestCreated = await createCreditRequestUseCase.invoke(parameterMock)
    
    expect(creditRequestCreated).toEqual(creditRequestCreatedMock)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should throw an error when body request contains an empty attribute when must to be required', async () => {
    for(const parameter of parameterEmptyMock){
      //@ts-ignore
      await expect(createCreditRequestUseCase.invoke(parameter)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createCreditRequestUseCase.invoke(parameter)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should throw an error when body request contains an undefined attribute when must to be required', async () => {
    for(const parameter of parameterWrongMock){
      //@ts-ignore
      await expect(createCreditRequestUseCase.invoke(parameter)).rejects.toThrowError('Body of the request are null or invalid')
      //@ts-ignore
      await expect(createCreditRequestUseCase.invoke(parameter)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should throw an error when farmer not found', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(departureDetailFoundMock)
    creditRequestPrimaRepositoryMock.getCreditRequestByFarmerId.mockResolvedValue(creditRequestFoundMock)
    farmerPrismaRepositoryMock.getFarmerById.mockResolvedValue(null)
    
    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toThrowError('El usuario elegido no existe')
    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toBeInstanceOf(BadRequestError)
  })
})

describe('PROCESS ERROR', () => {
  test('Should throw an error when there is not a delivery plan model', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(null)

    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toThrowError('Debe de crear un modelo de plan de entregas y una partida')
    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toBeInstanceOf(ProcessError)
  })

  test('Should throw an error when there is not a departure detail', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue([])

    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toThrowError('Debe de crear una partida como mínimo')
    await expect(createCreditRequestUseCase.invoke(parameterMock)).rejects.toBeInstanceOf(ProcessError)
  })

  test('Should throw an error when the number of hectares exceeds the maximum', async () => {
    departureDetailPrismaRepositoryMock.getDepartureDetailByCampaignId.mockResolvedValue(departureDetailFoundMock)
    creditRequestPrimaRepositoryMock.getCreditRequestByFarmerId.mockResolvedValue(creditRequestFoundMock)
    farmerPrismaRepositoryMock.getFarmerById.mockResolvedValue(farmerFoundMock)
    
    await expect(createCreditRequestUseCase.invoke(parameterMockWithMoreHectare)).rejects.toThrowError('El número de hectareas supera el limite del usuario')
    await expect(createCreditRequestUseCase.invoke(parameterMockWithMoreHectare)).rejects.toBeInstanceOf(ProcessError)
  })
})