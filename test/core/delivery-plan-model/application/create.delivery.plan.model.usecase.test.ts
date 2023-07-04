import CreateDeliveryPlanModelUseCase from '../../../../src/core/delivery-plan-model/application/create.delivery.plan.model.usecase'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'
import ProcessError from '../../../../src/utils/custom-errors/application-errors/process.error'
import { 
  deliveryPlanModelPrismaRepositoryMock,
  campaignPrismaRepositoryMock,
  campaignFoundMock,
  parametersMock,
  parameterIncorrectMock,
  deliveryPlanModelFoundMock,
  deliveryPlanModelIdMock,
  deliveryPlanModelCreatedMock,
  errorMessageProcessErrorMock,
  errorMessageBadRequestErrorMock,
  errorMessageBadRequestErrorMock2
} from '../mocks/create.delivery.plan.model.usecase.mock'

const createDeliveryPlanModelUseCase = new CreateDeliveryPlanModelUseCase(deliveryPlanModelPrismaRepositoryMock, campaignPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should create a delivery plan model successfully', async () => {
    campaignPrismaRepositoryMock.getCampaignById.mockResolvedValue(campaignFoundMock)
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelByCampaignId.mockResolvedValue(null)
    deliveryPlanModelPrismaRepositoryMock.getTotalNumberOfDeliveryPlanModel.mockResolvedValue(deliveryPlanModelIdMock)
    deliveryPlanModelPrismaRepositoryMock.createDeliveryPlanModel.mockResolvedValue(deliveryPlanModelCreatedMock)
    
    const deliveryPlanModelCreated = await createDeliveryPlanModelUseCase.invoke(parametersMock)
    
    expect(deliveryPlanModelCreated).toEqual(deliveryPlanModelCreatedMock)
  })
})

describe('PROCESS ERROR', () => {
  test('Should throw an error when there is a delivery plan model for this campaign', async () => {
    deliveryPlanModelPrismaRepositoryMock.getDeliveryPlanModelByCampaignId.mockResolvedValue(deliveryPlanModelFoundMock)

    await expect(createDeliveryPlanModelUseCase.invoke(parametersMock)).rejects.toThrowError(errorMessageProcessErrorMock)
    await expect(createDeliveryPlanModelUseCase.invoke(parametersMock)).rejects.toBeInstanceOf(ProcessError)
  })
})

describe('BAD REQUEST ERROR', () => {
  test('Should throw an error when body request contains an undefined attribute when must to be required', async () => {
    for(const parameter of parameterIncorrectMock){
      //@ts-ignore
      await expect(createDeliveryPlanModelUseCase.invoke(parameter)).rejects.toThrowError(errorMessageBadRequestErrorMock)
      //@ts-ignore
      await expect(createDeliveryPlanModelUseCase.invoke(parameter)).rejects.toBeInstanceOf(BadRequestError)
    }
  })

  test('Should throw an error when there is no campaign', async () => {
    campaignPrismaRepositoryMock.getCampaignById.mockResolvedValue(null)

    await expect(createDeliveryPlanModelUseCase.invoke(parametersMock)).rejects.toThrowError(errorMessageBadRequestErrorMock2)
    await expect(createDeliveryPlanModelUseCase.invoke(parametersMock)).rejects.toBeInstanceOf(BadRequestError)
  })
})