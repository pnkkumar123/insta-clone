import React,{useEffect,useState} from 'react'
import "./Profile.css";
import { useParams } from 'react-router-dom';
import { MdOutlineImage } from 'react-icons/md';



const UserProfile = () => {
    const {userid} = useParams();
    const [isFollow, setIsFollow] = useState(false)
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
  
    // to follow user
    const followUser = (userId)=>{
        fetch("http://localhost:5000/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body:JSON.stringify({
                followId:userId
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setIsFollow(true)
        })
    }
    // to unfolllow user
    const unfollowUser = (userId)=>{
        fetch("http://localhost:5000/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId:userId
            })
        })
        .then((res)=>{
            res.json();
        })
        .then((data)=>{
            console.log(data);
            setIsFollow(false);
        })
    };
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userid}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            }
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result.posts);
            setUser(result.user);
            setPosts(result.posts);
            if(
                result.user.followers.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                )
            ){
                setIsFollow(true)
            }
        }) 


    },[isFollow])
  
  
    return (
    <div className='profile'>
        <div className="profile-frame">
            <div className="profile-pic">
             {user.photo ? <img src={user.photo } alt="" /> : <MdOutlineImage/>}    
            </div>
            <div className="profile-data">
                <div
                style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                }}
                >
                    <h1>{user.name}</h1>
                    <button
                    className='followBtn'
                    onClick={()=>{
                        if(isFollow){
                            unfollowUser(user._id);
                        }else{
                            followUser(user._id)
                        }
                    }}
                    >
                       {isFollow ? "Unfollow" : "Follow"}
                    </button>
                

                </div>
                <div style={{display:"flex"}} className="profile-info">
                 <p>{posts.length}</p>
                 <p>{user.followers ? user.followers.length : "0"} followers</p>
                 <p>{user.following ? user.following.length : "0"} following</p>
                </div>
            </div>
        </div>
        <hr 
        style={{
            width:"90%",
            opacity:"0.8",
            margin:"25px auto",
        }}
        />
        <div className="gallery">
            {posts ?.map((pics)=>{
                return (
                    <img 
                    key={pics._id}
                    src={pics.photo} 
                    className="item"
                    alt="" />
                );
            })}
        </div>
    </div>
  )
}

export default UserProfile