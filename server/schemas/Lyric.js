const {Schema} = require('mongoose')

// 歌词
const LyricSchema = new Schema({
  content: String,
  liked: {
    type: Number,
    default: 0
  },
  songId: {
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }
})

module.exports = LyricSchema
