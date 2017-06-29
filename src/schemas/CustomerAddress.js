/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema
const City = require('./City')

const CustomerAddress = new Schema({
  address: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  neighborhood: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  number: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  complement: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = CustomerAddress