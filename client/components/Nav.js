import React from 'react'
import { Link } from 'react-router-dom'
import '../css/nav.css'

const Nav = (props) => (
  <div>
    <nav className={'navbar navbar-light bg-light'}>
      <Link to="/songList">歌曲列表</Link>
    </nav>
    {props.children}
  </div>
)

export default Nav
