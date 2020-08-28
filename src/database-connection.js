import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

const connectToDatabase = async () => {
  let mongoURI

  if (process.env.NODE_ENV === 'test') {
    mongoURI = process.env.MONGODB_URI_TEST || 'mongodb://mongo:27017/test'
  } else {
    mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/development'
  }

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
  })
}

export default connectToDatabase
