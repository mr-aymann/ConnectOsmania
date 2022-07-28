import React, { useState } from 'react'
import "../css/QuoraHeader.css"
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import  Button from '@mui/material/Button';
import Modal from 'react-responsive-modal';
import CloseIcon from '@mui/icons-material/Close';
import 'react-responsive-modal/styles.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Input from '@mui/icons-material/Input';

function QuoraHeader() {
  const [open, setOpen] = useState(false);
  const [inputUrl,setInputUrl]=useState("");

  const onOpenModal = () => setOpen(true);
  // onCloseModal = () => setOpen(false);
  const Close=<CloseIcon/>
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
                <Button onClick={onOpenModal}> Add Question</Button>
                <Modal
                  open={open}
                  //onClose={onCloseModal} 
                  closeIcon={Close}
                    onCloseModal = {() => setOpen(false)}
                    closeOnEsc
                    center
                    closeOnOverlayClick={false}
                    styles={{
                      overlay : {
                        height: "auto",
                      },

                    }}
                >
                  <div className='modal__title'>
                    <h5> Add Question</h5>
                    <h5> Share Link</h5>
                  </div>
                  <div className='modal__info'>
                    <Avatar className='avatar'/>
                    <div className='modal__scope'>
                      <PeopleAltIcon/>
                      <p>Public</p>
                      <ExpandMoreIcon/>
                    </div>
                  </div>
                  <div className='modal__field'>
                    
                   <div style={{
                      display:"flex",
                      flexDirection:"column"
                    }}>
                      <input type="text" style={{
                        margin: "5px 0",
                        border:"1px solid lightgray",
                        padding:"10px",
                        outline:"2px solid #0000",

                      }}
                      placeholder="Start typing your question with What,How,Why,etc." />
                      <input type='text'
                      value={inputUrl} 
                      onChange={(e)=>setInputUrl(e.target.value)}
                      placeholder='Optional:include a link that gives context' />
                      {
                        inputUrl !== "" && <img style={{
                          height:"20vh",
                          objectfit:"contain",
                        }}
                        src={inputUrl} alt='displayImage'/>
                      }
                      
                    </div>
                  </div>
                  <div className='modal__buttons'>
                    <button className='cancel' onClick={()=>setOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className='add'>
                      Add Question
                    </button>
                  </div>
                </Modal>
        </div>

    </div>
  )
}

export default QuoraHeader