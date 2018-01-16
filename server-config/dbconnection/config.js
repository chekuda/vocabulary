const mongoose = require('mongoose')

exports.createMongooseConection = () => {
  mongoose.connect(process.env.REMOTE_URI_DB, { useMongoClient: true })

  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open')
  })

  mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error: ' + err)
  })

  mongoose.connection.on('disconnected', err => {
    console.log('Mongoose default connection disconnected')
  })

  process.on('SIGINT', err => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
}
