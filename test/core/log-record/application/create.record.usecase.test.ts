import CreateRecordUseCase from '../../../../src/core/log-record/application/create.record.usecase'
import LogRecordMongoDBRepository from '../../../../src/core/log-record/infrastructure/log.record.mongodb.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/log-record/infrastructure/log.record.mongodb.repository")

describe('Create Campaign module test suites', () => {
  let logRecordMongoDBRepository: LogRecordMongoDBRepository
  let createRecordUseCase: CreateRecordUseCase

  beforeAll(() => {
    logRecordMongoDBRepository = new LogRecordMongoDBRepository()
  })

  beforeEach(() => {
    jest.spyOn(logRecordMongoDBRepository, 'createNewRecord').mockResolvedValue('Log record created')

    createRecordUseCase = new CreateRecordUseCase(logRecordMongoDBRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Create record successfully', async () => {
      const message = await createRecordUseCase.create({
        resource: 'test',
        method: 'GET',
        initRequestTime: new Date()
      })

      expect(message).toBe('Log record created')
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when no send required data in the request', async () => {
      try {
        // @ts-ignore
        await createRecordUseCase.create({
          //resource: 'test',
          method: 'GET',
          initRequestTime: new Date()
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })
})
