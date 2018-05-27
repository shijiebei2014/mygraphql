import React, {Component} from 'react'

import CreateLyric from './CreateLyric'
import LyricList from './LyricList'

import {Query, ApolloConsumer} from 'react-apollo'
import query from '../queries/song'


class SongDetail extends Component {
  constructor(props) {
    super(props)

    this.refetch = null // 重新获取
    this.cacheClient = null // 前台缓存
    this.song = {lyrics: []} // 前台只读缓存数据
    // this.onSubmit = this.onSubmit.bind(this)
  }
  // onSubmit() {
  //   this.refetch({variables: {id: this.props.location.state.id}})
  // }
  render() {
    console.log(this.props.location.state)
    if(!this.props.location.state || !this.props.location.state.id) {
      return null
    }
    return (
      <ApolloConsumer>
        {
          cacheClient => {
            console.log(cacheClient)
            this.cacheClient = cacheClient
            return (
              <Query query={query} variables={{id: this.props.location.state.id}}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return '加载中'
                  if (error) return `Error! ${error.message}`
                  const {data: {song}} = {data}
                  this.song = song
                  this.refetch = refetch
                  return (
                    <div>
                      <div className={'alert alert-secondary'} role='alter'>
                        {song.title}
                      </div>
                      <LyricList lyrics={song.lyrics}/>
                      <CreateLyric song={song} onSubmit={this.onSubmit}/>
                    </div>
                  )
                }}
              </Query>
            )
          }
        }
      </ApolloConsumer>
    )
  }
}

export default SongDetail
