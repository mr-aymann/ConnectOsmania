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
import axios from 'axios';
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

function QuoraHeader() {
  const [open, setOpen] = useState(false);
  const [inputUrl,setInputUrl]=useState("");
  const [question,setQuestion]=useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const Close=<CloseIcon/>
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit= async()=>{
    if(question!== ""){

      const config ={
        headers:{
          'Content-Type':'application/json'
      }
    }
      const data={
        questionName: question,
        questionUrl: inputUrl,
        user:user,
      }
      await axios.post('/api/questions',data,config).then((res) =>{
        console.log(res.data);
        alert("Question Added Successfully");
      }).catch((e)=>{
        console.log(e);
        alert("Error Adding Question");
      });
    }
  }
  const handleLogout = () => {
    if (window.confirm("Are you sure to logout ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };

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
            <div className='qHeader__Rem'>
              <span onClick={handleLogout}><Avatar src={user?.photo}/></span>
              </div>
                <Button style=
                {{ color: "white",
                  background: "#222",
                  textTransform: "inherit",
                  borderRadius: "5px",
                  marginLeft: "25px"}} 
    onClick={onOpenModal}> Add Question</Button>
                <Modal
                  open={open}
                  onClose={onCloseModal} 
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
                    <Avatar src={user?.photo} className='avatar'/>
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
                      onChange={(e)=>setQuestion(e.target.value)}
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
                    <button onClick={handleSubmit} type="submit" className='add'>
                      Add Question
                    </button>
                  </div>
                </Modal>
        </div>

    </div>
  )
}

export default QuoraHeader