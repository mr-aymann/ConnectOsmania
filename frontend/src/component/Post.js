import { Avatar } from '@mui/material'
import { React,useState } from 'react'
import "./css/Post.css"
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import CloseIcon from '@mui/icons-material/Close';

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};


function Post() {
  const [open, setOpen] = useState(false);
  const Close=<CloseIcon/>
  return (
    <div className='post'>
        <div className='post__info'>
            <Avatar/>
            <h4> User Name</h4>
            <small>Timestamp</small>
        </div>
        <div className='post__body'>
            <div className='post__question'>
            <p>This is test Question</p>
            <button onClick={()=>setOpen(true)} className='post__btnAnswer'>Answer</button></div>
            <Modal
             open={open}
              onClose={()=>setOpen(false)}     
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
              <div className='modal__question'>
                <h1>This is Test Question.</h1>
                <p>Asked by {" "} <span className='name'>Username </span>on <span className='name'>timestamp</span></p>
              </div>
              <div className='modal__answer'>
              <CustomQuill
                  theme="snow"
                  placeholder="Enter your answer"
                  modules={modules}
                />`
              </div>
              <div className='modal__buttons'>
                    <button className='cancel' onClick={()=>setOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className='add'>
                      Add Answer
                    </button>
                  </div>
            
            </Modal>
        </div>
        <div className='post__footer'>
            <div className='post__footerAction'>
                <ArrowUpwardOutlinedIcon/>
                <ArrowDownwardOutlinedIcon/>
            </div>
            <RepeatOutlinedIcon/>
            <ChatBubbleOutlinedIcon/>
            <div className='post__footerLeft'>
                <ShareOutlinedIcon/>
                <MoreHorizOutlinedIcon/>
            </div>
        </div>
        <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
         >Answer
        </p>
        
    <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
     <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered">
                <Avatar  />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info">
                  <p>Username</p>
                  <span>Timestamp
                  </span>
                </div>
              </div>
              <div className="post-answer"> This is test Answer</div>
            </div>
    </div>

    </div>
  )
}

export default Post