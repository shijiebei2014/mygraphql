import gql from 'graphql-tag'

export default gql`
 mutation addSong($songId: ID!, $content: String) {
   addLyricToSong(songId: $songId, content: $content) {
     id
     title
     lyrics {
       id
       content
       liked
     }
   }
 }
`
