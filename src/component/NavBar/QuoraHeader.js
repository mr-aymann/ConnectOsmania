import React from 'react'
import "../css/QuoraHeader.css"
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

function QuoraHeader() {
  return (
    <div className='qHeader'>
        <div className='qHeader-content'>
            <div className='qHeader__logo'>
                <img 
                src='https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif'
                 alt=''/></div>
                <div className='qHeader__icons'>
                <div className='qHeader__icon'><HomeIcon/></div>
                <div className='qHeader__icon'><FeaturedPlayListIcon/></div>
                <div className='qHeader__icon'><AssignmentTurnedInIcon/></div>
                <div className='qHeader__icon'><PeopleAltIcon/></div>
                <div className='qHeader__icon'><NotificationsActiveIcon/></div>
                </div>
            <div className='qHeader__input'>
                <SearchIcon/>
                <input type="text" placeholder='Search Questions'/>
            </div>
            <div className='qHeader__Rem'><Avatar/></div>
                <Button> Add Question</Button>
        </div>

    </div>
  )
}

export default QuoraHeader