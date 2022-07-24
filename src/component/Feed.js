import React from 'react'
import Quorabox from './Quorabox'
import "./css/feed.css"
import Post from './Post'

function Feed() {
  return (
    <div className='feed'>
      <Quorabox/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default Feed