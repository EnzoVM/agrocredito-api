import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error";
import ProcessError from "../../../utils/custom-errors/application-errors/process.error";
import DepartureDetailPersistanceRepository from "../../departure-detail/domain/departure.detail.persistance.repository";
import FarmerPersistanceRepository from "../../farmer/domain/farmer.persistance.repository";
import CreditRequestIdGeneratorRepository from "../domain/credit.request.id.generator.repository";
import CreditRequest from "../domain/credit.request.model";
import CreditRequestPersistanceRepository from "../domain/credit.request.persistance.repository";

export default class CreateCreditRequestUseCase {

  constructor(
    private readonly creditRequestPersistanceRepository: CreditRequestPersistanceRepository,
    private readonly creditRequestIdGeneratorRepository: CreditRequestIdGeneratorRepository,
    private readonly departureDetailPersistanceRepository: DepartureDetailPersistanceRepository,
    private readonly farmerPersistanceRepository: FarmerPersistanceRepository
  ) {}

  async invoke ({
    farmerId,
    campaignId,
    hectareNumber,
    creditReason,
    creditAmount,
    guaranteeDescription,
    guaranteeAmount,
    tecniqueId,
    creditRequestStatus,
    creditRequestObservation
  }:{
    farmerId: string
    campaignId: string
    hectareNumber: number
    creditReason: string
    creditAmount: number
    guaranteeDescription: string
    guaranteeAmount: number
    tecniqueId: number
    creditRequestStatus: string
    creditRequestObservation: string
  }): Promise<CreditRequest> {
    
    if(
      !farmerId ||
      !campaignId ||
      !hectareNumber ||
      !creditReason ||
      !creditAmount ||
      !guaranteeDescription ||
      !guaranteeAmount ||
      !tecniqueId ||
      !creditRequestStatus ||
      !creditRequestObservation
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Credit Request'})
    }

    if(
      typeof farmerId !== 'string' ||
      typeof campaignId !== 'string' ||
      typeof hectareNumber !== 'number' ||
      typeof creditReason !== 'string' ||
      typeof creditAmount !== 'number' ||
      typeof guaranteeDescription !== 'string' ||
      typeof guaranteeAmount !== 'number' ||
      typeof tecniqueId !== 'number' ||
      typeof creditRequestStatus !== 'string' ||
      typeof creditRequestObservation !== 'string'
    ) {
      throw new BadRequestError({ message: 'Body of the request are null or invalid', core: 'Credit Request'})
    }

    const departureDetailFound = await this.departureDetailPersistanceRepository.getDepartureDetailByCampaignId(campaignId)
    if(!departureDetailFound){
      throw new ProcessError({ message: 'Debe de crear un modelo de plan de entregas y una partida', core: 'Credit Request'})
    }
    if(departureDetailFound.length === 0){
      throw new ProcessError({ message: 'Debe de crear una partida como mínimo', core: 'Credit Request'})
    }
    
    let suma: number = 0
    const creditRequestFound = await this.creditRequestPersistanceRepository.getCreditRequestByFarmerId({farmerId})
    for (const credit of creditRequestFound) { suma += credit.hectareNumber }

    const farmerFound = await this.farmerPersistanceRepository.getFarmerById({farmerId})
    if(!farmerFound) { 
      throw new BadRequestError({ message: 'El usuario elegido no existe', core: 'Credit Request'}) 
    }
    
    if(hectareNumber+suma > farmerFound.propertyHectareQuantity){
      throw new ProcessError({ message: 'El número de hectareas supera el limite del usuario', core: 'Credit Request'})
    }
    
    const creditRequestId = await this.creditRequestIdGeneratorRepository.generateCreditRequestId()

    const newCreditRequest = new CreditRequest({
      creditRequestId,
      farmerId,
      campaignId,
      hectareNumber,
      creditReason,
      creditAmount,
      guaranteeDescription,
      guaranteeAmount,
      tecniqueId,
      creditRequestStatus,
      creditRequestObservation
    })

    const creditRequestCreated = await this.creditRequestPersistanceRepository.createCreditRequest({creditRequest: newCreditRequest})

    return creditRequestCreated
  }
}