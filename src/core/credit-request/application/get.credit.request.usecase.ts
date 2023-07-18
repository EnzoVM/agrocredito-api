import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"

export default class GetCreditRequestUseCase {
  constructor (private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository) {}

  async get ({ creditRequestId }: { creditRequestId: string }) {
    if (!creditRequestId) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({ creditRequestId })

    if (!creditRequestFound) {
      throw new NotFoundError({ message: 'La solicitud de crédito especificado no existe', core: 'credit-request' })
    }

    return creditRequestFound
  }
}