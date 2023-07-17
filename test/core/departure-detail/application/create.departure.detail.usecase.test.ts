import CreateDepartureDetailUseCase from '../../../../src/core/departure-detail/application/create.departure.detail.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import {
  departureDetailPrismaRepositoryMock,
  deliveryPlanModelPrismaRepositoryMock,
  deliveryPlanModelFoundMock,
  parametersMock,
  parameterIncorrectMock,
  departureDetailsFoundNothingMock,
  departureDetailsFoundOneMock,
  departureDetailsFoundTwoMock,
  departureDetailCreated,
  errorMessageBadRequestErrorMock,
  errorMessageBadRequestError2Mock,
  errorMessageProcessErrorMock
} from '../mocks/create.departure.detail.usecase.mock'

const createDepartureDetailUseCase = new CreateDepartureDetailUseCase(departureDetailPrismaRepositoryMock, deliveryPlanModelPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should create a departure detail successfully when none exist yet', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelById.mockResolvedValue(deliveryPlanModelFoundMock)
    departureDetailPrismaRepositoryMock.listDepartureDetail.mockResolvedValue(departureDetailsFoundNothingMock)
    departureDetailPrismaRepositoryMock.createDepartureDetail.mockResolvedValue(departureDetailCreated)
    
    const departureDeliveryCreated = await createDepartureDetailUseCase.invoke(parametersMock)
    
    expect(departureDeliveryCreated).toEqual(departureDetailCreated)
  })

  test('Should create a delivery plan model successfully when a departure already exists', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelById.mockResolvedValue(deliveryPlanModelFoundMock)
    departureDetailPrismaRepositoryMock.listDepartureDetail.mockResolvedValue(departureDetailsFoundOneMock)
    departureDetailPrismaRepositoryMock.createDepartureDetail.mockResolvedValue(departureDetailCreated)
    
    const departureDeliveryCreated = await createDepartureDetailUseCase.invoke(parametersMock)
    
    expect(departureDeliveryCreated).toEqual(departureDetailCreated)
  })
})

describe('PROCESS ERROR', () => {
  test('Should throw an error when trying to create a departure detail and there are already 2', async () => {
    departureDetailPrismaRepositoryMock.listDepartureDetail.mockResolvedValue(departureDetailsFoundTwoMock)

    await expect(createDepartureDetailUseCase.invoke(parametersMock)).rejects.toThrowError(errorMessageProcessErrorMock)
    await expect(createDepartureDetailUseCase.invoke(parametersMock)).rejects.toBeInstanceOf(ProcessError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should throw an error when body request contains an undefined attribute when must to be required', async () => {
    for(const parameter of parameterIncorrectMock){
      //@ts-ignore
      await expect(createDepartureDetailUseCase.invoke(parameter)).rejects.toThrowError(errorMessageBadRequestErrorMock)
      //@ts-ignore
      await expect(createDepartureDetailUseCase.invoke(parameter)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should throw an error when there is no delivery plan model', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelById.mockResolvedValue(null)

    await expect(createDepartureDetailUseCase.invoke(parametersMock)).rejects.toThrowError(errorMessageBadRequestError2Mock)
    await expect(createDepartureDetailUseCase.invoke(parametersMock)).rejects.toBeInstanceOf(BadRequestError)
  })
})