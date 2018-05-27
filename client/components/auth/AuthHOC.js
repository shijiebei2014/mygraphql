import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import createHashHistory from 'history/createHashHistory'

import query from '../../queries/user'

const history = createHashHistory()

export default (WrapComponent) => {
  class Auth extends Component {
    componentWillUpdate(nextProps) {
      if (nextProps.data.loading) {
        return <div>'加载中....'</div>
      }
      if (!nextProps.data.loading && !nextProps.data.currentUser) {
        console.log('/login')
        history.push('/login')
      }
    }
    render() {
      return <WrapComponent {...this.props}/>
    }
  }
  return graphql(query)(Auth)
}
