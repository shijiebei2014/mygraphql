const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require('graphql')
const Lyric = require('../models/lyric')

const SongType = new GraphQLObjectType({
  name: 'song',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    lyrics: {
      type: GraphQLList(require('./lyric')),
      resolve(parentValue) {
        return Lyric.find({_id: {$in: parentValue.lyrics}})
      }
    }
  })
})
module.exports = SongType
