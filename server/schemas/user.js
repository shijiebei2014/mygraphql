const {Schema} = require('mongoose')

// 歌词
const UserSchema = new Schema({
  email: String,
  password: String
})

module.exports = UserSchema
