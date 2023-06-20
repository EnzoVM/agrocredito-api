import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

if (!process.env.DATABASE_MONGODB) {
  throw new Error('Error')
}

mongoose.connect(process.env.DATABASE_MONGODB)
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(error => {
    console.error('Error in MongoDB connection:', error)
  })
