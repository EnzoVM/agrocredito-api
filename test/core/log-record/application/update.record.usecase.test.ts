import UpdateRecordUseCase from '../../../../src/core/log-record/application/update.record.usecase'
import LogRecordMongoDBRepository from '../../../../src/core/log-record/infrastructure/log.record.mongodb.repository'
import BadRequestError from '../../../../src/utils/custom-errors/application-errors/bad.request.error'

jest.mock("../../../../src/core/log-record/infrastructure/log.record.mongodb.repository")

describe('Create Campaign module test suites', () => {
  let logRecordMongoDBRepository: LogRecordMongoDBRepository
  let updateRecordUseCase: UpdateRecordUseCase

  beforeAll(() => {
    logRecordMongoDBRepository = new LogRecordMongoDBRepository()
  })

  beforeEach(() => {
    jest.spyOn(logRecordMongoDBRepository, 'setEndRequestTimeRecordById').mockResolvedValue('Log record updated')

    updateRecordUseCase = new UpdateRecordUseCase(logRecordMongoDBRepository)
  })

  describe('OPERATION SUCCESS', () => {
    test('Create record successfully', async () => {
      const message = await updateRecordUseCase.update({
        recordId: '2839830933',
        endRequestTime: new Date()
      })

      expect(message).toBe('Log record updated')
    })
  })

  describe('BAD REQUEST', () => {
    test('Should throw bad request error when no send required data in the request', async () => {
      try {
        // @ts-ignore
        await updateRecordUseCase.update({
          // recordId: '2839830933',
          endRequestTime: new Date()
        })
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
      }
    })
  })
})
