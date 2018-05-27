import React from 'react'
import ReactDOM from 'react-dom'

import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { Router, Route } from 'react-router'
import createHashHistory from 'history/createHashHistory'

import Nav from './Nav'
import Login from './Login'
import Signup from './Signup'
import AuthHOC from './AuthHOC'
import Dashborder from './Dashborder'

const history = createHashHistory()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    // Additional fetch options like `credentials` or `headers`
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null
  }),
})

const Parent = ( props ) => {
  const {location} = props
  const { pathname } = location
  const AuthDashborder = AuthHOC(Dashborder)
  console.log(location)

  switch (pathname) {
  case '/login':
    return (
      <div>
        <Nav />
        <Login history={history}/>
      </div>
    )
  case '/signup':
    return (
      <div>
        <Nav />
        <Signup history={history}/>
      </div>
    )
  default:
    return (
      <div>
        <Nav />
        <AuthDashborder />
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

ReactDOM.render(<App/>, document.querySelector('#app'))
