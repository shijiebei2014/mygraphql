const mongoose = require('mongoose')
const SongSchema = require('../schemas/song')

module.exports =  mongoose.model('Song', SongSchema)
