import { interesGeneral, interesMoratorio } from '../../src/utils/interest'

describe('Test interesGeneral', () => {
  test('Test general interest when actual date is not higher than campaign finish date', () => {
    const generalInterest = interesGeneral({
      camaignYear: '2023',
      finishDate: '24/08',
      fechaEntrega: new Date('2023-02-07T20:13:34.060Z'),
      fechaReporte: new Date('2023-08-20T20:13:34.060Z'),
      capital: 7800,
      porcentaje: 19
    })

    expect(generalInterest).toBe(762.41)
  })

  test('Test general interest when actual date is not higher than campaign finish date', () => {
    const generalInterest = interesGeneral({
      camaignYear: '2023',
      finishDate: '24/08',
      fechaEntrega: new Date('2023-02-14T20:13:34.060Z'),
      fechaReporte: new Date('2023-02-21T20:13:34.060Z'),
      capital: 10000,
      porcentaje: 19
    })

    expect(generalInterest).toBe(33.88)
  })

  test('Test general interest when actual date is higher than campaign finish date', () => {
    const generalInterest = interesGeneral({
      camaignYear: '2023',
      finishDate: '24/07',
      fechaEntrega: new Date('2023-02-07T20:13:34.060Z'),
      fechaReporte: new Date('2023-08-20T20:13:34.060Z'),
      capital: 7800,
      porcentaje: 19
    })

    expect(generalInterest).toBe(651.43)
  })

  test('Test general interest when actual date is higher than campaign finish date', () => {
    const generalInterest = interesGeneral({
      camaignYear: '2023',
      finishDate: '24/07',
      fechaEntrega: new Date('2023-02-14T20:13:34.060Z'),
      fechaReporte: new Date('2023-02-21T20:13:34.060Z'),
      capital: 10000,
      porcentaje: 19
    })

    expect(generalInterest).toBe(33.88)
  })
})