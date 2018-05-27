const mongoose = require('mongoose')
const LyricSchema = require('../schemas/lyric')

module.exports = mongoose.model('Lyric', LyricSchema)
