import TechnicalList from '../../../../src/core/technical/domain/technical.list.model'

export const technicalPrismaRepositoryMock = {
  listAllTechnicals: jest.fn(),
  listTechnicalsByAssistanceType: jest.fn()
}

export const assistanceTypeIdMock: number = 5

export const technicalListMock: TechnicalList[] = [
  {
      technicalId: 8,
      assistanceTypeDescription: "INDEPENDIENTES",
      technicalName: "Eras Luna Orlando"
  },
  {
      technicalId: 9,
      assistanceTypeDescription: "INDEPENDIENTES",
      technicalName: "Valladares Lopez Edilbert"
  },
  {
      technicalId: 10,
      assistanceTypeDescription: "INDEPENDIENTES",
      technicalName: "Olavarria Saavedra Ricard"
  },
  {
      technicalId: 11,
      assistanceTypeDescription: "INDEPENDIENTES",
      technicalName: "Coveñas Palomino Segundo"
  },
  {
      technicalId: 12,
      assistanceTypeDescription: "INDEPENDIENTES",
      technicalName: "Dios Espinoza Miguel"
  }
]
