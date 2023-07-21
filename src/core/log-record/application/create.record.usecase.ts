import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import LogRecordPersistanceRepository from "../domain/log.record.persistance.repository"

export default class CreateRecordUseCase {
  constructor (private readonly logRecordPersistanceRepository: LogRecordPersistanceRepository) {}

  async create ({
    resource,
    method,
    initRequestTime
  }: {
    resource: string,
    method: string,
    initRequestTime: Date
  }) {
    if (
      typeof resource === 'undefined' ||
      typeof method === 'undefined' ||
      typeof initRequestTime === 'undefined'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    const recordId = await this.logRecordPersistanceRepository.createNewRecord({
      resource,
      method,
      initRequestTime
    })

    return recordId
  }
}