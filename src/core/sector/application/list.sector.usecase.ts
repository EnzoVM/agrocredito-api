import SectorListModel from "../domain/sector.list.model";
import SectorPersistanceRepository from "../domain/sector.persistance.repository";

export default class ListSectorUseCase {
  
  constructor(
    private readonly sectorPersistanceRepository: SectorPersistanceRepository
  ) {}

  async invoke (): Promise<SectorListModel[]> {
    const sectorList = await this.sectorPersistanceRepository.listAllSectors()
    return sectorList.sectors
  }
}