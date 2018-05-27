import gql from 'graphql-tag'

export default gql`
 mutation addSong($title: String) {
   createSong(title: $title) {
     title
   }
 }
`
