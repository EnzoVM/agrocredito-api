import SectorListModel from "./sector.list.model";

export default interface SectorPersistanceRepository {
  listAllSectors: () => Promise<{sectors: SectorListModel[], count: number}>
  listSectorsByName: ({sectorDescription}:{sectorDescription: string}) => Promise<{sectors: SectorListModel[], count: number}>
  createSector: ({sectorDescription}:{sectorDescription: string}) => Promise<SectorListModel>
  deleteSectorById: ({sectorId}:{sectorId: number}) => Promise<string>
}