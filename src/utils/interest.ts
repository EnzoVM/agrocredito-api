function parseFecha(fechaStr: string) {
  const partes = fechaStr.split('-')
  return {
    año: parseInt(partes[0]),
    mes: parseInt(partes[1]),
    día: parseInt(partes[2])
  }
}

const esMayorLaFecha = (fecha1_str: string, fecha2_str: string) => {
  const fecha1 = parseFecha(fecha1_str)
  const fecha2 = parseFecha(fecha2_str)

  // Comparar las fechas
  if (fecha1.año < fecha2.año || 
    (fecha1.año === fecha2.año && fecha1.mes < fecha2.mes) || 
    (fecha1.año === fecha2.año && fecha1.mes === fecha2.mes && fecha1.día < fecha2.día)) {
    return false
  } else if (fecha1.año > fecha2.año || 
      (fecha1.año === fecha2.año && fecha1.mes > fecha2.mes) || 
      (fecha1.año === fecha2.año && fecha1.mes === fecha2.mes && fecha1.día > fecha2.día)) {
    return true
  } else {
    return false
  }
}

const getDateFormat = (date: Date) => {
  const formatoFecha = new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })
  return formatoFecha.format(date).split('/').reverse().join('-')
}

function diferencia360Dias(fechaInicio: string, fechaFin: string) {
  
  const [añoInicio, mesInicio, diaInicio] = fechaInicio.split('-')
  const [añoFin, mesFin, diaFin] = fechaFin.split('-')

  const diferencia = (Number(añoFin) - Number(añoInicio)) * 360 + (Number(mesFin) - Number(mesInicio)) * 30 + (Number(diaFin) - Number(diaInicio))

  return diferencia
}

const financialMath = ({ 
  capital, 
  porcentaje, 
  periodo, 
  tipo 
}: { 
  capital: number, 
  porcentaje: number, 
  periodo: number,
  tipo: 'General' | 'Moratorio'
}) => {

  const porcentajeFinal = tipo === 'General' ? porcentaje : porcentaje/360
  const factor = (1+porcentajeFinal/100)
  const periodoResultante = (periodo/360)
  const potencia = Math.pow(factor, periodoResultante) - 1
  const interes = Number((capital*potencia).toFixed(2))

  return interes
}

export const interesGeneral = ({
  camaignYear,
  finishDate,
  fechaEntrega,
  fechaReporte,
  capital,
  porcentaje
}: {
  camaignYear: string,
  finishDate: string,
  fechaEntrega: Date,
  fechaReporte: Date
  capital: number,
  porcentaje: number
}) => {
  const fechaReporteFormateado = getDateFormat(fechaReporte)
  const fechaFinalCampaña = `${camaignYear}-${finishDate.split('/').reverse().join('-')}`
  const fechaEntregaFormateada = getDateFormat(fechaEntrega)
  console.log(fechaEntregaFormateada)
  console.log(fechaEntrega)

  let periodo: number 
  
  if (esMayorLaFecha(fechaReporteFormateado, fechaFinalCampaña)) {
    periodo = diferencia360Dias(fechaEntregaFormateada, fechaFinalCampaña)
  }
  else {
    periodo = diferencia360Dias(fechaEntregaFormateada, fechaReporteFormateado)
  }

  const interes = financialMath({
    capital,
    porcentaje,
    periodo,
    tipo: 'General'
  })

  console.log(interes)

  return interes
}

export const interesMoratorio = ({
  camaignYear,
  finishDate,
  fechaReporte,
  capital,
  porcentaje
}: {
  camaignYear: string,
  finishDate: string,
  fechaReporte: Date,
  capital: number,
  porcentaje: number
}) => {
  const fechaReporteFormateado = getDateFormat(fechaReporte)  
  const fechaCampaña = `${camaignYear}-${finishDate.split('/').reverse().join('-')}`

  let periodo: number 
  if (esMayorLaFecha(fechaReporteFormateado, fechaCampaña)) {
    periodo = diferencia360Dias(fechaCampaña, fechaReporteFormateado)
  }
  else {
    periodo = 0
  }

  const interes = financialMath({
    capital,
    porcentaje,
    periodo,
    tipo: 'Moratorio'
  })
  console.log(interes)
  return interes
}

interesGeneral({
  camaignYear: '2023',
  capital: 28000,
  fechaEntrega: new Date('2023-08-01 22:34:00.000'),
  fechaReporte: new Date(),
  finishDate: '31/08',
  porcentaje: 19
})