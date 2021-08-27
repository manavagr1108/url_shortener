const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  Asia: {
    type: Number,
    required: true,
    default: 0
  },
  Africa: {
    type: Number,
    required: true,
    default: 0
  },
  North_America: {
    type: Number,
    required: true,
    default: 0
  },
  South_America: {
    type: Number,
    required: true,
    default: 0
  },
  Australia: {
    type: Number,
    required: true,
    default: 0
  },
  Europe: {
    type: Number,
    required: true,
    default: 0
  },
  Antarctica: {
    type: Number,
    required: true,
    default: 0
  },
  date:{
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)