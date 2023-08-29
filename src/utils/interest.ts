const getDateFormat = (date: Date) => {
  const formatoFecha = new Intl.DateTimeFormat('es-PE', {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })
  const formatoFinal = formatoFecha.format(date).split('/').reverse().join('-')
  const fechaReporteFinal = new Date(formatoFinal)
  return fechaReporteFinal
}

function diferencia360Dias(fechaInicio: Date, fechaFin: Date) {
  const diaInicio = fechaInicio.getDate()
  const diaFin = fechaFin.getDate()
  const mesInicio = fechaInicio.getMonth() + 1
  const mesFin = fechaFin.getMonth() + 1
  const añoInicio = fechaInicio.getFullYear()
  const añoFin = fechaFin.getFullYear()

  const diferencia = (añoFin - añoInicio) * 360 + (mesFin - mesInicio) * 30 + (diaFin - diaInicio)

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
  
  const fechaCampaña = `${camaignYear}-${finishDate.split('/').reverse().join('-')}`
  const fechaCampañaFormateada = new Date(fechaCampaña)

  fechaCampañaFormateada.setDate(fechaCampañaFormateada.getDate())

  let periodo: number 
  if (fechaReporteFormateado > fechaCampañaFormateada) {
    periodo = diferencia360Dias(fechaEntrega, fechaCampañaFormateada)
  }
  else {
    periodo = diferencia360Dias(fechaEntrega, fechaReporteFormateado)
  }

  const interes = financialMath({
    capital,
    porcentaje,
    periodo,
    tipo: 'General'
  })

  return interes
}

export const interesMoratorio = ({
  camaignYear,
  finishDate,
  capital,
  porcentaje
}: {
  camaignYear: string,
  finishDate: string,
  capital: number,
  porcentaje: number
}) => {
  const fechaReporte = new Date()
  const fechaReporteFormateado = getDateFormat(fechaReporte)
  
  const fechaCampaña = `${camaignYear}-${finishDate.split('/').reverse().join('-')}`
  const fechaCampañaFormateada = new Date(fechaCampaña)

  fechaCampañaFormateada.setDate(fechaCampañaFormateada.getDate())

  let periodo: number 
  if (fechaReporteFormateado > fechaCampañaFormateada) {
    periodo = diferencia360Dias(fechaCampañaFormateada, fechaReporteFormateado)
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

  return interes
}
