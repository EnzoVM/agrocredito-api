import './core/log-record/infrastructure/mongodb.connection'
import LogRecord from "./core/log-record/infrastructure/model/log.record.model"
import fs from 'fs/promises'

async function createCreditRequest () {
  const logRecordsFound = await LogRecord.find({
    resource: 'create-credit-request'
  })

  const timeCalulated = logRecordsFound.map(logRecord => {
    return `00:00:${(((logRecord.endRequestTime.getTime() - logRecord.initRequestTime!.getTime())/1000)).toFixed(0)}`.concat('\n')
  })

  await fs.writeFile('./cacluate.txt', timeCalulated)

  console.log(logRecordsFound.length)
}

async function calculateInterest () {
  const logRecordsFound = await LogRecord.find({
    resource: 'calculate-interest'
  })

  const timeCalulated = logRecordsFound.map(logRecord => {
    return `${(((logRecord.endRequestTime.getTime() - logRecord.initRequestTime!.getTime())/1000))}`.split('.').join(',').concat('\n')
  })

  await fs.writeFile('./cacluate.txt', timeCalulated)

  console.log(logRecordsFound.length)
}

async function reportes () {
  const logRecordsFound = await LogRecord.find()

  const filter = logRecordsFound.filter(log => {
    return log.resource!.startsWith('report')
  })

  const timeCalulated = filter.map(logRecord => {
    return `${((logRecord.endRequestTime.getTime() - logRecord.initRequestTime!.getTime())/1000).toFixed(3)}`.split('.').join(',').concat('\n')
  })

  await fs.writeFile('./cacluate.txt', timeCalulated)

  console.log(timeCalulated)
}

createCreditRequest()