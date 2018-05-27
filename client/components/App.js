import React from 'react'
import ReactDOM from 'react-dom'

import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { Router, Route } from 'react-router'
import createHashHistory from 'history/createHashHistory'

import SongList from './SongList'
import SongDetail from './SongDetail'
import Nav from './Nav'

const history = createHashHistory()
const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null
  }),
})

const Parent = ( props ) => {
  const {location} = props
  const { pathname } = location
  // console.log(location)
  if (pathname === '/songDetail') {
    return (
      <div>
        <Nav />
        <SongDetail {...props} />
      </div>
    )
  } else {
    return (
      <div>
        <Nav />
        <SongList {...props}/>
      </div>
    )
  }
}
const App = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <div>
        <Route path="/" component={Parent}/>
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.querySelector('#app'))
