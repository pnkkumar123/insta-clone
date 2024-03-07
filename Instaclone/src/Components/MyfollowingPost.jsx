import React, { useEffect, useState } from 'react';
import './Home.css';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import { MdOutlineMood } from 'react-icons/md';


const MyfollowingPost = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [comment,setComment] = useState("");
    const [show,setShow] = useState(false)
    const [item, setItem] = useState([])

    // toast functions
     const notifyA = (msg)=>toast.error(msg)
     const notifyB = (msg)=>toast.success(msg)

     useEffect(()=>{
        const token  = localStorage.getItem("jwt")
        if(!token){
            navigate("/signin")
        }
        // fetching all posts
        fetch("http://localhost:5000/myfollowingpost",{
            headers:{
                Authorization:"Bearer " + localStorage.getItem("jwt"),
            },
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            setData(result)
        })
        .catch((err)=>console.log(err))
     },[])
    //  to show hide comments
    const toggleComment = (posts)=>{
        if(show){
            setShow(false)
        }else{
            setShow(true)
            setItem(posts)
        }
    };
    // like post
    const likePost = (id)=>{
        fetch("http://localhost:5000/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body:JSON.stringify({
                postId:id,
            }),
        })
        .then((res)=>res.json())
        .then((result)=>{
            const newData = data.map((posts)=>{
                if(posts._id == result._id){
                    return result;
                }else{
                    return posts;
                }
            })
            setData(newData);
            console.log(result);
        })
    }
const unlikePost = (id)=>{
    fetch("http://localhost:5000/unlike",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer " + localStorage.getItem("jwt"),
        },
        body:JSON.stringify({
            postId:id,
        }),
    })
    .then((res)=>res.json())
    .then((result)=>{
        const newData = data.map((posts)=>{
            if(posts._id == result._id){
                return result
            }else{
                return posts;
            }
        });
        setData(newData);
        console.log(result);
    })
}
// function to make comment
const makeComment = (text,id)=>{
    fetch("http://localhost:5000/comment",{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body:JSON.stringify({
            text:text,
            postId:id,
        })
    })
    .then((res)=>res.json())
    .then((result)=>{
        const newData = data.map((posts)=>{
            if(posts._id == result._id){
                return result;
            }else{
                return posts;
            }
        })
        setData(newData);
        setComment("");
        notifyB("Comment posted")
    })
}

  return (
    <div className='home'>
        {/* cards */}
        {data.map((posts)=>{
            return (
                <div className="card">
                    {/* card header */}
                    <div className="card-header">
                        <div className="card-pic">
                            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                        <h5>
                            <Link to={`/profile/${posts.postedBy._id}`}>

                            {posts.postedBy.name}
                            </Link>
                            </h5>
                    </div>
                    {/* card image */}
                    <div className="card-image">
                        <img src={posts.photo} alt="" />
                    </div>
                    {/* card content */}
                    <div className="card-content">
                        {posts.likes.includes(
                            JSON.parse(localStorage.getItem("user"))._id
                        )?(
                            <MdOutlineMood onClick={()=>{
                                unlikePost(posts._id)
                            }}/>
                        ):(
                            <MdOutlineMood onClick={()=>{likePost(posts._id)}} />
                        )}
                        <p>{posts.likes.length}</p>
                        <p>{posts.body}</p>
                        <p
                        style={{fontWeight:"bold",cursor:"pointer"}}
                        onClick={()=>{
                            toggleComment(posts)
                        }}
                        >
                         view all comments
                        </p>
                    </div>
                    {/* add comment */}
                    <div className="add-comment">
                        <MdOutlineMood/>
                        <input type="text" 
                        placeholder='add a comment'
                        value={comment}
                        onChange={(e)=>{
                            setComment(e.target.value)
                        }}
                        />
                        <button
                        className='comment'
                        onClick={()=>{
                            makeComment(comment,posts._id)
                        }}
                        >
                            Post

                        </button>
                    </div>
                </div>
            )
        })}
        {/* show comment */}
        {show && (
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
                        </div>
                        {/* commentSection */}
                        <div className="comment-section">
                            {item.comments.map((comment)=>{
                                return (
                                    <p className='comm'>
                                        <span className="commenter">
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
                            <input type="text"
                            placeholder='Add a comment'
                            value={comment}
                            onChange={(e)=>{
                                setComment(e.target.value)
                            }}
                            />
                            <button
                            className='comment'
                            onClick={()=>{
                                makeComment(comment,item._id);
                                toggleComment()
                            }}
                            >
                            Post
                            </button>
                        </div>
                    </div>
                </div>
                <div
                className='close-comment'
                onClick={()=>{
                    toggleComment()
                }}
                >
                 <MdOutlineMood/>
                 close
                </div>
            </div>
        )}
    </div>
  )
}

export default MyfollowingPost