import React, { Component } from 'react'
import {graphql} from 'react-apollo'

import AuthForm from './AuthForm'
import mutation from '../../mutations/signup'
// import query from '../../queries/user'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {errors: ''}
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit({email, password}) {
    // console.log(mutation)
    this.setState({errors: ''})
    this.props.mutate({
      variables: {email, password}
    }).then(()=>{
      this.props.history.push('/')
    }).catch((err)=>{
      console.log(this.props)
      this.setState({
        errors: err.graphQLErrors.map((e)=> e.message)
      })
    })
  }
  render() {
    return (
      <AuthForm title="注册页" onSubmit={this.onSubmit} errors={this.state.errors}/>
    )
  }
}

export default graphql(mutation)(Signup)
