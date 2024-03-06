import React,{useState,useEffect} from 'react'
import "./Profile.css";



function Profile() {
  const [pic, setPic] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
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
        setPic(result);
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
          <img src="https://media.istockphoto.com/id/1336512835/photo/volcanic-eruption-in-iceland.jpg?s=612x612&w=is&k=20&c=205Aw3G46MBotlwGLKOt5ZJG8mrPpRm2A6WnR23ty5Q=" alt="" />
        </div>
        {/* profile-data */}
        <div className="profile-data">
        <h1>hello dude</h1>  
        <div className="profile-info">
          <p>  40 posts</p><br />
          <p>  40 followers</p><br />
          <p> 40 following</p><br />
        </div>
        </div>
      </div>
      <hr style={{width:"90%",margin:"auto",opacity:"0.8",margin:"25px auto"}} />
      {/* Gallery */}
      <div className="gallery">
       {pic.map((pics)=>{
        console.log(pics);
        return <img key={pics._id} src={pics.photo} className='item'/>
       }
      )}

      
      </div>

    </div>
  )
}

export default Profile