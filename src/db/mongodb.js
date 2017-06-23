/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('mongoose')

var options = {
  db: { native_parser: true },
  server: { 
    poolSize: 5,
    reconnectTries: Number.MAX_VALUE
  },
  user: '',
  pass: ''
}

mongoose.connection.on('connected', () => {
    console.info('Mongoose default connection open')
})

mongoose.connection.on('error', (error) => {
    console.error('Mongoose default connection error: ', error)
})

mongoose.connection.on('disconnected', function () {
    console.warn('Mongoose default connection disconnected')
})

mongoose.connection.on('open', () => {
    console.log('Mongoose default connection is opened')
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.info('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/sager', options)
mongoose.set('debug', true)

module.exports = mongoose;