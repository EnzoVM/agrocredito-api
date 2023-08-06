import CampaignPersistanceRepository from "../domain/campaign.persistance.repository"
import Campaign from "../domain/campaign.model"
import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import ProcessError from "../../../utils/custom-errors/application-errors/process.error"
import CampaignTypePersistanceRepository from "../../campaing-type/domain/campaign.type.persistance.repository"

export default class CreateCampaignUseCase {
  private readonly campaignPersistanceRepository: CampaignPersistanceRepository
  private readonly campaignTypePersistanceRepository: CampaignTypePersistanceRepository

  constructor(campaignPersistanceRepository: CampaignPersistanceRepository, campaignTypePersistanceRepository: CampaignTypePersistanceRepository) {
    this.campaignPersistanceRepository = campaignPersistanceRepository
    this.campaignTypePersistanceRepository = campaignTypePersistanceRepository
  }

  async invoke ({
    campaignDescription, 
    campaignTypeId, 
    campaignYear,
    startDate, 
    finishDate,
    campaignInterest,
    campaignDelinquentInterest
  }:{
    campaignDescription: string,
    campaignTypeId: number,
    campaignYear: string,
    startDate: string,
    finishDate: string,
    campaignInterest: number,
    campaignDelinquentInterest: number
  }): Promise<Campaign> {
    
    const campaignTypeFound = await this.campaignTypePersistanceRepository.getCampaignTypeById(campaignTypeId)
    if(!campaignTypeFound){
      throw new BadRequestError({ message: 'El id del tipo de campaña no existe', core: 'Campaign'})
    }

    const campaignByYear = await this.campaignPersistanceRepository.getCampaignByYearAndType(campaignYear, campaignTypeId)
    const numberOfCampaignByYear = campaignByYear.length
  
    if(numberOfCampaignByYear >= campaignTypeFound.periodQuantity){
      throw new ProcessError({ message: 'Ha superado el número de campañas de este año', core: 'Campaign'})
    }

    const periodName = `Periodo ${numberOfCampaignByYear + 1}`
    const campaignId = campaignTypeFound.campaignTypeDescription.split(' ')[0].slice(0, 3)+'0'+periodName.trim().slice(-1)+campaignYear

    const [startDateDay, startDateMonth] = startDate.split('/').map(Number)
    const [finishDateDay, finishDateMonth] = finishDate.split('/').map(Number)

    if(startDateDay <= 0 ||  startDateDay > 31 || finishDateDay <= 0 || finishDateDay > 31) {
      throw new BadRequestError({ message: 'El día no puede ser menor que 0 ni mayor que 31', core: 'Campaign'})
    }
    if(startDateMonth <= 0 ||  startDateMonth > 12 || finishDateMonth <= 0 || finishDateMonth > 12) {
      throw new BadRequestError({ message: 'El mes no puede ser menor que 0 ni mayor que 12', core: 'Campaign'})
    }

    const startDateNumberToSave = Number(`${startDate.split('/').join('')}`)

    const startDateNumberForValidation = Number(`${startDate.split('/').reverse().join('')}`)
    const finishDateNumberForValidation = Number(`${finishDate.split('/').reverse().join('')}`)
    
    if (startDateNumberForValidation >= finishDateNumberForValidation) {
      throw new BadRequestError({ message: 'La fecha de inicio no debe ser mayor que la fecha de finalización.', core: 'Campaign'})
    }

    const finishDatesNumber = campaignByYear.map(campaign => {
      return Number(`${campaign.finishDate.split('/').join('')}`)
    })

    const startDateIsValid = finishDatesNumber.every((finishDate) => finishDate < startDateNumberToSave)

    if (!startDateIsValid) {
      throw new ProcessError({ message: 'La fecha de inicio debe ser posterior a la fecha de finalización de la última campaña.', core: 'Campaign'})
    }
  
    const newCampaign = new Campaign({
      campaignId,
      campaignDescription,
      campaignTypeId,
      campaignYear,
      periodName,
      startDate,
      finishDate,
      campaignInterest,
      campaignDelinquentInterest
    })

    const campaignCreated = await this.campaignPersistanceRepository.createCampaign(newCampaign)

    return campaignCreated
  }
}