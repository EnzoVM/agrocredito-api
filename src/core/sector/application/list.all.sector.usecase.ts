import BadRequestError from "../../../utils/custom-errors/application-errors/bad.request.error";
import SectorListModel from "../domain/sector.list.model";
import SectorPersistanceRepository from "../domain/sector.persistance.repository";

export default class ListAllSectorUseCase {

  constructor(
    private readonly sectorPersistanceRepository: SectorPersistanceRepository
  ) {}

  async invoke ({
    sectorDescription, 
    page, 
    limit, 
    typeSearch
  }:{
    sectorDescription?: string, 
    page: number, 
    limit: number, 
    typeSearch: 'all' | 'name'
  }): Promise<{sectorList: SectorListModel[], count: number}> {

    if(
      !page ||
      !limit ||
      !typeSearch
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Sector'})
    }

    if(
      typeof page !== 'number' ||
      typeof limit !== 'number' 
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Sector'})
    }

    if(
      typeSearch !== 'all' &&
      typeSearch !== 'name' 
    ) {
      throw new BadRequestError({ message: 'Se tiene que especificar los campos requeridos', core: 'Sector'})
    }

    let sectorList: SectorListModel[] = []
    let sectorCount: number = 0

    if(typeSearch === 'all'){
      const {sectors, count} = await this.sectorPersistanceRepository.listAllSectors()
      sectorList = sectors
      sectorCount = count
    }

    if(typeSearch === 'name'){
      if(!sectorDescription){
        throw new BadRequestError({ message: 'Se tiene que especificar el nombre del sector', core: 'Sector'})
      }
      const {sectors, count} = await this.sectorPersistanceRepository.listSectorsByName({sectorDescription})
      sectorList = sectors
      sectorCount = count
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const listSectors = sectorList.slice(startIndex, endIndex)

    return {
      sectorList: listSectors,
      count: sectorCount
    }
  }
}