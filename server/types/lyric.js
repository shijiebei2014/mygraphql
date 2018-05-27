const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID } = require('graphql')

const LyricType = new GraphQLObjectType({
  name: 'lyric',
  fields: () => ({
    id: {type: GraphQLID},
    content: {type: GraphQLString},
    liked: {type: GraphQLInt},
    songId: {type: require('./song')}
  })
})

module.exports = LyricType
