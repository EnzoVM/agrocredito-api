import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import LogRecordPersistanceRepository from "../domain/log.record.persistance.repository"

export default class UpdateRecordUseCase {
  constructor (private readonly logRecordPersistanceRepository: LogRecordPersistanceRepository) {}

  async update ({
    recordId,
    endRequestTime
  }: {
    recordId: string,
    endRequestTime: Date
  }) {
    if (
      typeof recordId === 'undefined' ||
      typeof endRequestTime === 'undefined'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'farmer' })
    }

    const message = await this.logRecordPersistanceRepository.setEndRequestTimeRecordById({
      recordId,
      endRequestTime
    })

    return message
  }
}