import TechnicalList from '../../../../src/core/technical/domain/technical.list.model'

export const technicalPrismaRepositoryMock = {
  listAllTechnicals: jest.fn(),
  listTechnicalsByAssistanceType: jest.fn()
}

export const technicalListMock: TechnicalList[] = [
  {
      technicalId: 1,
      assistanceTypeDescription: "SERVIAGRO",
      technicalName: "SILVA CRUZ TEODORO"
  },
  {
      technicalId: 2,
      assistanceTypeDescription: "SERVIAGRO",
      technicalName: "ZAPATA CAMACHO PORFIRIO"
  },
  {
      technicalId: 3,
      assistanceTypeDescription: "Tecnologóa Tumbesina",
      technicalName: "JAVIER MIJAHUANCA"
  }
]
