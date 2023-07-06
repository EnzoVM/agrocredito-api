import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error"
import { FarmerList } from "../domain/farmer.list.model"
import FarmerPersistanceRepository from "../domain/farmer.persistance.repository"
import { FarmerType } from "../domain/farmer.type"

export default class ListFarmerUseCase {
  constructor (private readonly farmerPersistanceRepository: FarmerPersistanceRepository) {}

  async list ({
    searchType,
    farmerId,
    farmerFullNames,
    farmerSocialReason,
    farmerType,
    page,
    limit
  }: {
    searchType: 'code' | 'name',
    farmerId?: string,
    farmerFullNames?: string,
    farmerSocialReason?: string,
    farmerType: FarmerType,
    page: number, 
    limit: number
  }): Promise<{ farmers: FarmerList[], count: number }> {
    
    if (
      !searchType ||
      !page ||
      !limit
    ) {
      throw new BadRequestError({ message: 'You must to specify a valid json', core: 'farmer' })
    }

    if (
      searchType !== 'code' &&
      searchType !== 'name'
    ) {
      throw new BadRequestError({ message: 'You must to specify a valid searchType', core: 'farmer' })
    }

    if (
      farmerType !== 'Individual' &&
      farmerType !== 'Asociación'
    ) {
      throw new BadRequestError({ message: 'You must to specify a valid farmerType', core: 'farmer' })
    }

    let finalCount: number = 0
    let finalFarmers: FarmerList[] = []

    if (searchType === 'code') {
      if (typeof farmerId === 'undefined') {
        throw new BadRequestError({ message: 'Must specify a farmer id', core: 'farmer' })
      }

      const { farmers, count } = await this.farmerPersistanceRepository.getFarmersByIncludeId({ farmerId, farmerType })
      finalFarmers = farmers
      finalCount = count
    }

    if (searchType === 'name') {
      if (farmerType === 'Individual') {
        if (!farmerFullNames) {
          throw new BadRequestError({ message: 'Must specify a farmer full name', core: 'farmer' })
        }

        const { farmers, count } = await this.farmerPersistanceRepository.getFarmersByFullNames({ fullNames: farmerFullNames })
        finalFarmers = farmers
        finalCount = count
      }

      if (farmerType === 'Asociación') {
        if (!farmerSocialReason) {
          throw new BadRequestError({ message: 'Must specify a social reason', core: 'farmer' })
        }

        const { farmers, count } = await this.farmerPersistanceRepository.getFarmersBySocialReason({ socialReason: farmerSocialReason })
        finalFarmers = farmers
        finalCount = count
      }
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const farmersSliced = finalFarmers.slice(startIndex, endIndex)

    return {
      farmers: farmersSliced,
      count: finalCount
    }
  }
}