import React from 'react'
import QuoraHeader from './NavBar/QuoraHeader'
import "./css/Quora.css"
import SideBar from "./SideBar"
import Feed from "./Feed"
import Widget from "./Widget"

function Quora() {
  return (
    <div className='quora'>
        <QuoraHeader/>
        <div className='quora__contents'>
            <div className='quora__content'>
               <SideBar/>
               <Feed/>
               <Widget/> 
            </div>
        </div>
    </div>
  )
}

export default Quora