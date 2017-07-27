/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const mongoose = require('../db/mongodb')
const Schema = mongoose.Schema

const Inspection = new Schema({
  address: {
    type: String,
    required: true
  },
  details: {
    salesman: String,
    code: {
      type: String,
      default: 'SIAF'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: null
    }
  },
  messages: [{
    user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      uppercase: true,
      trim: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
  }],
  attachments: [{
    user: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      min: 0,
      required: true
    },
    extension: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: null,
      uppercase: true,
      trim: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
  }],
  measures: [{
    typeMeasure: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    beam: {
      type: Number,
      min: 0,
      required: true
    },
    distanceBetweenBeams: {
      type: Number,
      min: 0,
      required: true
    },
    squareMeter: {
      type: Number,
      min: 0,
      required: true
    },
    reinforce: {
      type: Boolean,
      required: true,
      default: false
    },
    beamQuantity: {
      type: Number,
      min: 0,
      default: 0
    },
    beamQuantityAdditional: {
      type: Number,
      min: 0,
      default: 0
    },
    beamTotal: {
      type: Number,
      min: 0,
      default: 0
    },
    fillQuantity: {
      type: Number,
      min: 0,
      default: 0
    },
    fillQuantityAdditional: {
      type: Number,
      min: 0,
      default: 0
    },
    fillTotal: {
      type: Number,
      min: 0,
      default: 0
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Inspection', Inspection)