import React, { Component } from 'react'
import {graphql, Query} from 'react-apollo'

import { Link } from 'react-router-dom'

import query from '../../queries/user'
import mutation from '../../mutations/logout'
import '../../css/nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
  }
  onLogout() {
    this.props.mutate({
      refetchQueries: [{query}]
    })
  }
  componentWillUpdate(nextProps) {
    console.log('nav will update:', nextProps)
  }
  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return '加载中'
          if (error) return `Error! ${error.message}`
          const {data: {currentUser}} = {data}
          console.log('Nav:', currentUser)
          if (currentUser) {
            return (
              <div>
                <nav className={'navbar navbar-light bg-light'}>
                  <button onClick={this.onLogout} type="button" className="btn btn-primary">退出</button>
                  <Link to="/signup">注册</Link>
                </nav>
                {this.props.children}
              </div>
            )
          } else {
            return (
              <div>
                <nav className={'navbar navbar-light bg-light'}>
                  <Link to="/login">请登录</Link>
                  <Link to="/signup">注册</Link>
                </nav>
                {this.props.children}
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default graphql(mutation)(Nav)
