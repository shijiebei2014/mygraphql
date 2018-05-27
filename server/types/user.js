const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  })
})

module.exports = UserType
