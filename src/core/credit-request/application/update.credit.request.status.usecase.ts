import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import DeliveryPersistanceRepository from "../../delivery/domain/delivery.persistance.respository"
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository"
import { CreditRequestStatusType } from "../domain/credit.request.status.type"

export default class UpdateCreditRequestStatusUseCase {
  constructor (
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly deliveryPersistanceRepository: DeliveryPersistanceRepository
  ) {}

  async update ({ 
    creditRequestStatus, 
    creditRequestId 
  }: { 
    creditRequestStatus: CreditRequestStatusType, 
    creditRequestId: string 
  }): Promise<string> {
    if (
      !creditRequestId ||
      !creditRequestStatus
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'credit-request' })
    }

    if (!Object.values(CreditRequestStatusType).includes(creditRequestStatus)) {
      throw new BadRequestError({ message: 'Credit request type is invalid', core: 'farmer' })
    }

    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestById({ creditRequestId })

    if (!creditRequestFound) {
      throw new NotFoundError({ message: 'La solicitud de crédito especificado no existe', core: 'credit-request' })
    }

    const deliveryCount = await this.deliveryPersistanceRepository.countDeliveriesByCreditRequestId({ creditRequestId })

    if (creditRequestStatus === CreditRequestStatusType.REFUSED) {
      if (deliveryCount > 0) {
        throw new ProcessError({ message: 'Esta solicitud de credito ya se encuentra vigente debido a que exiten entregas realizadas', core: 'credit-request' })
      }
    }
    
    await this.creditRequestPersistanceRepository.updateCreditRequestStatusById({ creditRequestId, creditRequestStatus, updateStatusDateTime: new Date() })

    return `El estado de la solicitud de crédito ha actualizado de ${creditRequestFound.creditRequestStatus} a ${creditRequestStatus} exitosamente`
  }
}