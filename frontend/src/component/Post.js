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
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { selectUser } from '../feature/userSlice';
import { useSelector } from 'react-redux';


class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
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




function Post({post,keys}) {
  const [open, setOpen] = useState(false);
  const [answer,setAnswer]=useState("");
  const Close=<CloseIcon/>

  const user=useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

    const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user:user,
      };
      await axios
        .post("/api/answers", body, config)
        .then((res) => {
          console.log(res.data);
          alert("Answer added succesfully");
          //setIsModalOpen(false);
          setOpen(false);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
          alert("Error adding answer");
        });
    }
  };


  return (
    <div className='post'>
        <div className='post__info'>
            <Avatar src = {post?.user?.photo}/>
            <h4> {post?.user?.userName}</h4>
            <small><LastSeen date={Date.parse(post?.createdAt)} />
            </small>
        </div>
        <div className='post__body'>
            <div className='post__question'>
            <p>{post?.questionName}</p>
            <button onClick={()=>setOpen(true)} 
            className='post__btnAnswer'>Answer</button></div>
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
                <h1>{post?.questionName}</h1>
                <p>Asked by {" "} <span className='name'>{user?.userName} </span>on <span className='name'>
                {new Date(post?.createdAt).toLocaleString()}</span></p>
              </div>
              <div className='modal__answer'>
              <CustomQuill
                  theme="snow"
                  value={answer}
                  onChange={handleQuill}
                  placeholder="Enter your answer"
                  modules={modules}
                />`
              </div>
              <div className='modal__buttons'>
                    <button className='cancel' onClick={()=>setOpen(false)}>
                      Cancel
                    </button>
                    <button   onClick={handleSubmit} type="submit" className='add'>
                      Add Answer
                    </button>
                  </div>
            </Modal>
            {post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />}
            
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
         >{post?.allAnswers.length} Answer(s)
        </p>
        
    <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
      {post?.allAnswers?.map((_a) => (
          <>
            <div key={keys}
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
                className="post-answered"
              >
                <Avatar src={_a?.user?.photo} />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>{_a?.user?.userName}</p>
                  <span>
                    <LastSeen date={_a?.createdAt} />
                  </span>
                </div>
              </div>
              <div className="post-answer">
                {console.log(_a?.answer.slice(0,100))}
                {ReactHtmlParser(_a?.answer.slice(0,100))}
                
                <details>
                    <summary>
                      <span id="open">read more</span> 
                      <span id="close">close</span> 
                    </summary>
                    <p>{ReactHtmlParser(_a?.answer.slice(100))}</p> 
              </details>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Post;