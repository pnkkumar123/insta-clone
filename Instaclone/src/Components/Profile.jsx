import React,{useState,useEffect} from 'react'
import "./Profile.css";
import PostDetail from './PostDetails';
import ProfilePic from './ProfilePic';



function Profile() {
  const [pic, setPic] = useState([])
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState("")
   const [changePic, setChangePic] = useState(false)


  const toggleDetails = (posts)=>{
    if(show){
      setShow(false)
    }else{
      setShow(true)
      setPosts(posts)
    }
  }
const changeprofile = ()=>{
  if(changePic){
    setChangePic(false)
  }else{
    setChangePic(true)
  }
}

  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Unauthorized');
        }
        return res.json();
    })
    .then(result => {
      console.log(result.posts);
        setPic(result.posts);
        setUser(result.user)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle unauthorized access here
    });
}, []);

  return (
    <div className='profile'>
      {/* profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img src={user.photo ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" } onClick={changePic} alt="" />
        </div>
        {/* profile-data */}
        <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>  
        <div className="profile-info">
          <p>{pic ? pic.length : "0"} posts </p><br />
          <p>{user.followers ? user.followers.lenght : "0"} followers </p><br />
          <p>{user.following ? user.following.length : "0"} following </p><br />
        </div>
        </div>
      </div>
      <hr style={{width:"90%",margin:"auto",opacity:"0.8",margin:"25px auto"}} />
      {/* Gallery */}
      <div className="gallery">
      {pic.map((pics) => {
    console.log(pics);
    return <img key={pics._id} src={pics.photo} onClick={() => {
        toggleDetails(pics)
    }} className='item' />
})}

      
      </div>
      {show && 
      <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic && 
        <ProfilePic changeprofile={changeprofile}/>
      }

    </div>
  )
}

export default Profile