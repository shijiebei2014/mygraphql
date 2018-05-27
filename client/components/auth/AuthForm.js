import React, { Component } from 'react'

class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {email: '', password: ''}
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    const {name, value} = e.target

    this.setState({[name]: value})
  }
  onSubmit(e) {
    e.preventDefault()
    
    this.props.onSubmit({...this.state})
  }
  render () {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <h3>{this.props.title}</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">邮箱</label>
              <input
                name="email"
                type="email"
                className={'form-control'}
                placeholder={'Enter email!'}
                value={this.state.email}
                onChange={this.onChange}/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">密码</label>
              <input
                name="password"
                type="password"
                className={'form-control'}
                placeholder={'Enter password!'}
                value={this.state.password}
                onChange={this.onChange}/>
            </div>
          </div>

          <div className="form-group" style={{display: 'flex', justifyContent: 'center'}}>
            <button type="submit" className="btn btn-primary">提交</button>
          </div>
        </form>

        {this.props.errors && <div className="alert alert-secondary" role="alert">{this.props.errors}</div>}

      </div>
    )
  }
}

export default AuthForm
