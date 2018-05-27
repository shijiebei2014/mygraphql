const {Schema} = require('mongoose')

// 歌曲
const SongSchema = new Schema({
  title: String,
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'Lyric'
  }]
})

module.exports = SongSchema
