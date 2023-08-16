import SectorListModel from "../domain/sector.list.model";
import SectorPersistanceRepository from "../domain/sector.persistance.repository";
import PrismaConnection from "../../../prisma/prisma.connection"
import UnavailableError from "../../../utils/custom-errors/infrastructure-errors/unavailable.error";

const prisma = new PrismaConnection().connection

export default class SectorPrismaRepository implements SectorPersistanceRepository{
    
  async listAllSectors (): Promise<{sectors: SectorListModel[], count: number}> {
    try {
      const sectorList = await prisma.sector.findMany({
        orderBy: {
          sector_id: "asc"
        }
      })

      const count: number = sectorList.length

      return {
        sectors: sectorList.map(sector => {
          return {
            sectorId: sector.sector_id,
            sectorDescription: sector.sector_description
          }
        }),
        count
      }
    
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Sector'})
    }
  }

  async listSectorsByName ({ sectorDescription }: { sectorDescription: string; }): Promise<{ sectors: SectorListModel[]; count: number; }> {
    try {
      const sectorList = await prisma.sector.findMany({
        where:{
          sector_description: {
            contains: sectorDescription
          }
        },
        orderBy: {
          sector_id: "asc"
        }
      })
      
      const count: number = sectorList.length
      
      return {
        sectors: sectorList.map(sector => {
          return {
            sectorId: sector.sector_id,
            sectorDescription: sector.sector_description
          }
        }),
        count
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Sector'})
    }
  }

  async createSector ({ sectorDescription }: { sectorDescription: string }): Promise<SectorListModel> {
    try {
      const sectorAdded = await prisma.sector.create({
        data: {
          sector_description: sectorDescription
        }
      })

      return {
        sectorId: sectorAdded.sector_id,
        sectorDescription: sectorAdded.sector_description
      }

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Sector'})
    }
  }

  async deleteSectorById ({ sectorId }: { sectorId: number }): Promise<string> {
    try {
      const sectorDeleted = await prisma.sector.delete({
        where: {
          sector_id: sectorId
        }
      })

      return `The Sector ${sectorDeleted.sector_description} was deleted`

    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'Sector'})
    }
  }
   
}