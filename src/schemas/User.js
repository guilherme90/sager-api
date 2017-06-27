/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema;
const {MESSAGE_DEFAULT_UNIQUE} = require('../filters/constants')
const bcrypt = require('bcrypt')

const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  userType: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
    rounds: 10
  },
  active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
},{
    collection: 'usuario',
    versionKey: false
})

User.plugin(require('mongoose-bcrypt'));
User.plugin(require('mongoose-unique-validator'), MESSAGE_DEFAULT_UNIQUE)

module.exports = mongoose.model('User', User)