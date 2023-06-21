import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ConnectionError from '../../../utils/connection.error'

dotenv.config()

if (process.env.DATABASE_MONGODB_URI == null) {
  throw new Error('Error e')
}

mongoose.connect(process.env.DATABASE_MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(error => {
    throw new ConnectionError({message: `Error in MongoDB connection: ${error.message}`, core: 'logrecord'})
  })
