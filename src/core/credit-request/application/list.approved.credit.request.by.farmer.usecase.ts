import NotFoundError from "../../../utils/custom-errors/application-errors/not.found.error";
import CreditRequestCreate from "../domain/credit.request.create.model";
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository";

export default class ListApprovedCreditRequestByFarmerUseCase {
  constructor(
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository
  ) {}

  async invoke ({farmerId}:{farmerId: string}): Promise<CreditRequestCreate[]>{
    const creditRequestList = await this.creditRequestPersistanceRepository.listApprovedCreditRequestByFarmerId({farmerId})
    if(creditRequestList.length === 0){
      throw new NotFoundError({ message: 'No se ha encontrado creditos aprobados para este usuario', core: 'Credit Request'})
    }

    return creditRequestList
  }
}