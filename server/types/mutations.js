const passport = require('passport')
const Lyric = require('../models/lyric')
const Song = require('../models/song')
const User = require('../models/user')


const createSong = function(title) { // 创建歌曲
  var lyric = []
  return Song.create({title, lyric})
}

const removeSong = function(_id) {
  return Song.remove({_id})
}

const addLyricToSong = function({songId, content}) {
  return Lyric.create({content}).then((lyric)=>{
    if (!lyric) {
      throw new Error('创建歌词失败')
    } else {
      return Song.findByIdAndUpdate(songId, {$addToSet: {lyrics: lyric._id}})
    }
  })
}

const addLiked = function({id}) {
  return Lyric.findByIdAndUpdate(id, {$inc: {liked: 1}}, {new: true})
}

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

const signup = function({email, password, req}) { // 注册
  return new Promise((resolve, reject)=> {
    User.findOne({email}).then((user) => {
      if (user) {
        return reject(`用户${email},已存在`)
      } else {
        return new User({email, password}).save()
      }
    }).then((user)=>{
      if (!user) {
        return reject(`用户${email}创建失败`)
      }
      req.logIn(user, (err) => {
        err ? reject(err) : resolve(user)
      })
    }).catch((err)=>{
      reject(err)
    })
  })
}

const login = function({email, password, req}) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return reject(err) }
      if (!user) { return reject('用户密码不对')}
      req.logIn(user, (err) => {
        if (err) { return reject(err) }
        resolve(user)
      })
    })(req || {body: {email, password}})
  })
}

const logout = function(req) {
  req.logout()
  req.user = null
  return req.user
}


module.exports = {
  createSong,
  removeSong,
  addLyricToSong,
  addLiked,
  signup,
  login,
  logout
}
