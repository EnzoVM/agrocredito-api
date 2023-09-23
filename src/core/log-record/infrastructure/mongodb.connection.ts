import mongoose from 'mongoose'
import ConnectionError from '../../../utils/custom-errors/infrastructure-errors/unavailable.error'
mongoose.connect('mongodb+srv://agrocreditopebpt:p9S5aKJoLs599D94@agrocredito.xtviico.mongodb.net/agrocredito-log-dev')
  .then(() => {
    console.log('MongoDB connection successful')
  })
  .catch(error => {
    throw new ConnectionError({message: `Error in MongoDB connection: ${error.message}`, core: 'logrecord'})
  })
