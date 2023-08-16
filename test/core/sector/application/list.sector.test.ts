import ListSectorUseCase from '../../../../src/core/sector/application/list.sector.usecase'
import { 
  sectorPrismaRepositoryMock,
  sectorListMock,
  sectorListMockResponse
} from '../mocks/list.sector.mock'

const listSectorUseCase = new ListSectorUseCase(sectorPrismaRepositoryMock)

describe('OPERATION SUCCESS', () => {
  test('Should return a list of sectors', async () => {
    sectorPrismaRepositoryMock.listAllSectors.mockResolvedValue(sectorListMock)

    const sectorList = await listSectorUseCase.invoke()
    
    expect(sectorList).toEqual(sectorListMockResponse)
  })
})