import React, {Component} from 'react'

import CreateSong from './CreateSong'

import {graphql, Query} from 'react-apollo'
import removeSong from '../mutations/removeSong'
import query from '../queries/songs'

import '../css/songList.css'

class SongList extends Component {
  constructor(props) {
    super(props)

    this.detail = this.detail.bind(this)
  }
  detail({id}) {
    // console.log('id:', id)
    this.props.history.push({
      pathname: '/songDetail',
      state: {id}
    })
  }
  remove({id}) {
    console.log(id)
    this.props.mutate({
      variables: {id},
      refetchQueries: [{query}]
    })
  }
  renderSong(songList) {
    return songList.map((data) => {
      const {id, title} = data
      // console.log('data:', data)
      return <li
        className={'list-group-item list-group-item-action'}
        key={id}>
        <span onClick={() => {this.detail({id, title})}}>{title}</span>

        <span>
          <span onClick={() => {this.remove({id})}} aria-hidden="true">&times;</span>
        </span>
      </li>
    })
  }

  render() {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return '加载中'
          if (error) return `Error! ${error.message}`
          const {data: {songList}} = {data}
          return (
            <div>
              <ul className={'list-group'}>
                {this.renderSong(songList)}
              </ul>

              <CreateSong />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default graphql(removeSong)(SongList)
