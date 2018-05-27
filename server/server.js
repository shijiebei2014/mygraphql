const express = require('express')
const graphqlHTTP = require('express-graphql')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const {
  createSong,
  removeSong,
  addLyricToSong,
  addLiked,
  signup,
  login,
  logout
} = require('./types/mutations')
const SongType = require('./types/song')
const LyricType = require('./types/lyric')
const UserType = require('./types/user')

const Song = require('./models/song')
const User = require('./models/user')

const mongoose = require('mongoose')

const app = express()

// 静态资源
app.use('/static', express.static(__dirname + '/../dist'))
app.use(require('cookie-parser')())
// app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session ({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost/graph',
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: () => ({
      songList: {
        type: GraphQLList(SongType),
        resolve() {
          return Song.find({}).then((datas)=>{
            console.log('datas:', datas)
            return datas
          })
        }
      },
      song: {
        type: SongType,
        args: {id: {type: GraphQLNonNull(GraphQLID)}},
        resolve(parentValue, {id}) {
          return Song.findById(id).populate('lyrics')
        }
      },
      currentUser: {
        type: UserType,
        resolve(parentValue, args, req) {
          return req.user
        }
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'mutaition',
    fields: () => ({
      createSong: { // 新建
        type: SongType,
        args: { title: {type: GraphQLString} },
        resolve(parentValue, {title}) {
          return createSong(title)
        }
      },
      removeSong: { // 删除
        type: SongType,
        args: {id: {type: GraphQLNonNull(GraphQLID)}},
        resolve(parentValue, {id}) {
          return removeSong(id)
        }
      },
      addLyricToSong: { // 歌曲添加歌词
        type: SongType,
        args: {songId: {type: GraphQLNonNull(GraphQLID)}, content: {type:GraphQLString}},
        resolve(parentValue, {songId, content}) {
          return addLyricToSong({songId, content})
        }
      },
      addLiked: { // 点赞
        type: LyricType,
        args: {id: {type: GraphQLNonNull(GraphQLID)}},
        resolve(parentValue, {id}) {
          return addLiked({id})
        }
      },
      signup: {
        type: UserType,
        args: {
          email: {type: GraphQLString},
          password: {type: GraphQLString},
        },
        resolve(parentValue, {email, password}, req) {
          return signup({email, password, req})
        }
      },
      login: {
        type: UserType,
        args: {
          email: {type: GraphQLString},
          password: {type: GraphQLString},
        },
        resolve(parentValue, {email, password}, req) {
          req.body = {email, password}
          console.log('args:', {email, password})
          return login({email, password, req})
        }
      },
      logout: {
        type: UserType,
        resolve(parentValue, args, req) {
          return logout(req)
        }
      }
    })
  }),
  types: [SongType, LyricType]
})

// const root = { hello: () => 'Hello world!' }

app.use('/graphql', graphqlHTTP({
  schema: schema,
  // rootValue: mutations,
  // rootValue: {songList: [{id: '1', title: 'hello', lyrics: [{id: '1', songId: '1'}]}]},
  graphiql: true,
}))

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  function(email, password, done) {
    console.log('LocalStrategy:', {email, password})
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (user.password !== password) { return done(null, false) }
      return done(null, user)
    })
  }
))

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html')
  res.send(fs.readFileSync(__dirname + '/../dist/index.html'))
})

app.get('/auth', function (req, res) {
  res.set('Content-Type', 'text/html')
  res.send(fs.readFileSync(__dirname + '/../dist/auth.html'))
})
// workspace/node/mongodb/bin/./mongod --dbpath workspace/node/mongodb/data
// ../node/mongodb/bin/./mongod --dbpath ../node/mongodb/data
// 连接mongo数据库
mongoose.connect('mongodb://localhost/graph', function(err) {
  if (err) {
    console.log(`数据库连接失败: ${err}`)
  } else {
    console.log('数据库连接成功')
  }
})

app.listen(4000, () => {
  console.log('Now browse to localhost:4000/graphql')
  console.log('Visit http://localhost:4000/#/')
})
