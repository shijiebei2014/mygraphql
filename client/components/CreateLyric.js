import React, {Component} from 'react'
import {graphql} from 'react-apollo'

import mutation from '../mutations/addLyricToSong'
import query from '../queries/song'

class CreateLyric extends Component {
  constructor(props) {
    super(props)

    this.state = {content: ''}
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    const content = this.state.content
    const {song: {id}} = this.props
    // const {onSubmit} = this.props
    this.props.mutate({
      variables: {
        content,
        songId: id
      },
      // 与dataIdFromObject有关
      refetchQueries: [{query, variables: {id}}]
    }).then(() => {
      this.setState({title: ''})
      // onSubmit()
    })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className={'form-group'}>
          <label htmlFor="title">歌词</label>
          <input
            type="text"
            className={'form-control'}
            id="title"
            value={this.state.content}
            onChange={(e) => {this.setState({content: e.target.value})}}
          />
        </div>
      </form>
    )
  }
}

export default graphql(mutation)(CreateLyric)
