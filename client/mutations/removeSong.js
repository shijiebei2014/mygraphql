import gql from 'graphql-tag'

export default gql`
 mutation remove($id: ID!) {
   removeSong(id: $id) {
     title
   }
 }
`
