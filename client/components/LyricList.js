import React, { Component } from 'react'

import {graphql} from 'react-apollo'

import mutation from '../mutations/updateLiked'

class LyricList extends Component {
  constructor(props) {
    super(props)

    this.updateLiked = this.updateLiked.bind(this)
    this.renderLyrics = this.renderLyrics.bind(this)
  }
  updateLiked({id, liked}) {
    // const lyrics = []
    // this.song.lyrics.forEach(function(lyric) {
    //   if (lyric.id === id) {
    //     const liked = lyric.liked + 1
    //     lyrics.push({...lyric, liked})
    //   } else {
    //     lyrics.push({...lyric})
    //   }
    // })
    // this.cacheClient.writeData({data: {...this.song, lyrics}})

    // 与dataIdFromObject有关系
    this.props.mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        addLiked: {
          id,
          __typename: 'lyric',
          liked: liked + 1
        }
      }
    })
  }
  renderLyrics(lyrics) { //渲染歌词
    const html = lyrics.map((lyric) => {
      const {id, content, liked} = lyric
      return (
        <li className={'list-group-item'} key={id}>
          <span onClick={()=> {this.updateLiked({id, liked})}}>{content}</span>

          <span>{liked}</span>
        </li>
      )
    })
    return (
      <ul className={'list-group'}>
        {html}
      </ul>
    )
  }
  render () {
    return this.renderLyrics(this.props.lyrics)
  }
}
export default graphql(mutation)(LyricList)
