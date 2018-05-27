import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import createSong from '../mutations/createSong'
import query from '../queries/songs'

class CreateSong extends Component {
  constructor(props) {
    super(props)
    
    this.state = {title: ''}
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    const {title} = this.state
    this.props.mutate({
      variables: {
        title: title
      },
      refetchQueries: [{query}]
    }).then(() => {
      this.setState({title: ''})
    })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={'form-group'}>
          <label htmlFor="title">歌曲名</label>
          <input
            type="text"
            className={'form-control'}
            id="title"
            value={this.state.title}
            onChange={(e) => {this.setState({title: e.target.value})}}
          />
        </div>
      </form>
    )
  }
}

export default graphql(createSong)(CreateSong)
