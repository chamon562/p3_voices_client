import React, {useState} from 'react'
import axios from 'axios'
import CommentForm from '../components/CommentForm'
import Comment from './Comment'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const Post = (props) => {
    console.log(props.post.postedBy)
    const userData = props.user
    const post = props.post
    let [redirect, setRedirect] = useState(false);

    const [open, setOpen] = React.useState(false);
    // const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    let commentList = props.post.comments.map((comment, index) =>{
        return <Comment comment={comment} key={index} user={props.user} />
    })
    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${REACT_APP_SERVER_URL}/api/posts/${props.post._id}`,{
            method: "DELETE"
        })
        .then(response =>{
            console.log(response)
            setRedirect(true)
            window.location.reload(false)
        })
    }
    if(redirect) return <Redirect to="/community" /> 
    
      return(
        <div>
            <div className="posts">
                <button onClick={handleOpen}>{props.post.title}</button>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >       
                <div className="modals" >
                    <h3 className="modals">title: {props.post.title}</h3>
                    <h3 className="content">content: {props.post.content}</h3>
                    <h3 className="category">category: {props.post.category}</h3>
                    {console.log(props.post.postedBy)}
                    {console.log(userData)}
                    { post.postedBy._id === userData.id ? 
                    <button className="modals" onClick={handleDelete}>Delete Post</button>
                    : 
                    <></> 
                    } 
                        <div className="commlist">
                            {commentList ? commentList : <> </>}
                        </div>
                        <div className="form">
                            <CommentForm user={props.user} post={props.post}/>
                         </div>
                </div>
                </Modal>
            </div>

        </div>
    )
}
export default Post