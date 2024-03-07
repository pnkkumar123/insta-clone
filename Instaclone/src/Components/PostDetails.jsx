import React from 'react';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { MdOutline10K, MdOutlineClose,  MdOutlineMood } from 'react-icons/md';


export default function PostDetail({item,toggleDetails}){
    const navigate = useNavigate()
    // toast functions
    const notifyA = (msg)=>toast.error(msg)
    const notifyB = (msg)=>toast.success(msg)

    const removePost = (postId)=>{
        if(window.confirm("Do you really want to delete this post ?")){
            fetch(`http://localhost:5000/deletePost/${postId}`,{
                method:"delete",
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((res)=>res.json())
            .then((result)=>{
                console.log(result);
                toggleDetails();
                navigate("/")
                notifyB(result.message);
            })
        }
    }
    return (
        <div className="showComment">
            <div className="container">
                <div className="postPic">
                    <img src={item.photo} alt="" />
                </div>
                <div className="details">
                    {/* card header */}
                    <div className="card-header">
                        <div className="card-pic">
                        <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
                        </div>
                        <h5>{item.postedBy.name}</h5>
                        <div className="deletePost"
                        style={{borderBottom:"1px solid #00000029"}}
                        >
                        <MdOutline10K/>delete
                        </div>
                    </div>
                    {/* commentSection */}
                    <div className="comment-section">
                        {item.comments.map((comment)=>{
                            return (
                                <p className='comm'>
                                    <span className='commenter'>
                                        {comment.postedBy.name}{" "}
                                    </span>
                                    <span className='commentText'>{comment.comment}</span>
                                </p>
                            )
                        })}
                    </div>
                    {/* card content */}
                    <div className="card-content">
                        <p>{item.likes.length} Likes</p>
                        <p>{item.body}</p>
                    </div>
                    {/* add comment */}
                    <div className="add-comment">
                        <MdOutlineMood/>
                        <input type="text" placeholder='Add a comment' />
                        <button
                        className='comment'
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            <div className="close-comment"
            onClick={()=>{
                toggleDetails();
            }}
            >
                <MdOutlineClose/>close
            </div>
        </div>
    )
}