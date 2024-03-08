import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // Add this import statement
import { MdOutlineMood } from "react-icons/md";
import './Home.css';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])
    useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("/signin");
          return;
        }
  
        const response = await fetch("http://localhost:5000/allposts", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.post); // Access the 'post' key in the response
        console.log(result.post);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [navigate]);

  // to show hide comments
  const toggleComment = (posts)=>{
    if(show){
      setShow(false)

    }else{
      setShow(true);
      setItem(false)
    }
  }
  

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to unlike post");
      }
      return res.json();
    })
    .then((result) => {
      const newData = data.map((posts) => {
        if (posts._id === result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
      console.log(result);
    })
    .catch(error => {
      console.error("Error unliking post:", error);
    });
  };
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
      }),
    })
    .then((res)=>res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id == result._id){
          return result;
        }else{
          return posts
        }
      });
      setData(newData);
      setComment("");
      console.log(result);
    })
  }
  

  return (
    <div className="home">
      {/* card */}
      {data?.map((posts) => {
        console.log(posts);
        return (
          <div className="card" key={posts._id}> {/* Add key prop */}
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                
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
  ) ? (
    <CiHeart onClick={() => unlikePost(posts._id)} /> 
  ) : (
    <FaHeart onClick={() => likePost(posts._id)} /> 
  )}

  <p>{posts.likes.length} Likes</p>
  <p>{posts.body} </p>
  <p
  style={{fontWeight:"bold",cursor:"pointer"}}
  onClick={()=>{
    toggleComment(posts)
  }}
  >
view all Comments
  </p>
</div>            

            {/* add Comment */}
            <div className="add-comment">
             <MdOutlineMood/>
             <input type="text"
             placeholder="Add a comment"
             value={comment}
             onChange={(e)=>{
              setComment(e.target.value)
             }}
             />
             <button
             className="comment"
             onClick={()=>{
              makeComment(comment,posts._id)
             }}
             >
              Post
             </button>
              
                
              
             
            </div>
            {/* show comment */}
            {show && (
              <div className="showComment">
                <div className="container">
                  <div className="postPic">
                    <img src={posts.photo} alt="" />

                  </div>
                  <div className="details">
                    {/* card header */}
                    <div
                    className="card-header"
                    style={{borderBottom: "1px solid #00000029"}}
                    >
                      <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="" />
                      </div>
                      <h5>{posts.postedBy.name}</h5>

                    </div>
                    {/* comment section */}
                    <div
                    className="comment-section"
                    style={{borderBottom:"1px solid #00000029"}}
                    >
                      {posts?.comments.map((comment)=>{
                        return(
                          <p className="comm">
                            <span style={{fontWeight:"bolder"}} className="commenter">
                               {comment.postedBy.name}
                            </span>
                            <span className="commentText">{comment.comment}</span>

                          </p>
                        )
                      })}

                    </div>
                    {/* card content */}
                    <div className="card-content">
                      <p>{posts.likes.length} Likes</p>
                       <p>{posts.body}</p>
                    </div>
                    {/* add comment */}
                    <div className="add-comment">
                      <MdOutlineMood/>
                      <input type="text"
                      placeholder="Add a comment"
                      value={comment}
                      onChange={(e)=>{
                        setComment(e.target.value)
                      }}
                      />
                      <button
                      className="comment"
                      onClick={()=>{
                        makeComment(comment, posts._id);
                        toggleComment();
                      }}
                      >
                       post
                      </button>
                    </div>

                  </div>

                </div>
                <div className="close-comment"
                onClick={()=>{
                  toggleComment();
                }}
                >
                   <MdOutlineMood/>
                   CLose
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
