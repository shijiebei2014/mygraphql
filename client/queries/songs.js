import gql from 'graphql-tag'

export default gql`
  query {
    songList {
      id
      title
    }
  }
`
