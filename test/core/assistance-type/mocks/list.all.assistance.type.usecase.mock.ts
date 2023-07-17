import AssistanceTypeListModel from '../../../../src/core/assistance-type/domain/assistance.type.list.model'

export const assistanceTypePrismaRepositoryMock = {
  listAllAssistanceType: jest.fn()
}

export const assistanceTypeListMock: AssistanceTypeListModel[] = [
  {
    assistanceTypeId: 1,
    assistanceTypeDescription: "SERVIAGRO"
  },
  {
      assistanceTypeId: 2,
      assistanceTypeDescription: "AGROINDUSTRIAS"
  },
  {
      assistanceTypeId: 3,
      assistanceTypeDescription: "Tecnologóa Tumbesina"
  },
  {
      assistanceTypeId: 4,
      assistanceTypeDescription: "P&G INGENIEROS"
  },
  {
      assistanceTypeId: 5,
      assistanceTypeDescription: "INDEPENDIENTES"
  }
]