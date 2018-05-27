import gql from 'graphql-tag'

export default gql`
 mutation incLiked($id: ID!) {
   addLiked(id: $id) {
     id
     content
     liked
   }
 }
`
