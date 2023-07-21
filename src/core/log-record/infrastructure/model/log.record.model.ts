import mongoose, { Schema } from 'mongoose'

const logRecordSchema = new Schema({
  resource: {
    type: String,
    require: true
  },
  method: {
    type: String,
    require: true
  },
  initRequestTime: {
    type: Date,
    require: true
  },
  endRequestTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: false,
  versionKey: false
})

const LogRecord = mongoose.model('LogRecord', logRecordSchema)

export default LogRecord
