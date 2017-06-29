/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema
const { MESSAGE_DEFAULT_UNIQUE } = require('../filters/constants')
const CustomerAddress = require('./CustomerAddress')

const Customer = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true
  },
  telephone: {
    type: String,
    trim: true,
    default: null
  },
  cellphone: {
    type: String,
    required: true,
    trim: true
  },
  addresses: [CustomerAddress],
  created_at: {
    type: Date,
    default: Date.now
  }
},{
    collection: 'cliente',
    versionKey: false
})

Customer.plugin(require('mongoose-unique-validator'), MESSAGE_DEFAULT_UNIQUE)

module.exports = mongoose.model('Customer', Customer)