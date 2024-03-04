import React,{useEffect,useState} from "react";
import { MdOutlineFavoriteBorder,MdOutlineMood } from "react-icons/md";
import './Home.css'
import {useNavigate} from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);


  return (
    <div>
      {/* card */}
      {data && data.post && data.post.map((posts)=>{
        console.log(posts);
      })}
      <div className="card">
        {/* card header */}
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h5>samesh</h5>
        </div>
        {/* card image */}
        <div className="card-image">
          <img
            src="https://media.istockphoto.com/id/1336512835/photo/volcanic-eruption-in-iceland.jpg?s=612x612&w=is&k=20&c=205Aw3G46MBotlwGLKOt5ZJG8mrPpRm2A6WnR23ty5Q="
            alt=""
          />
        </div>
        {/* card-content */}
        <div className="card-content">
        <MdOutlineFavoriteBorder />
        <p>1 Like</p>
        <p className="caption">This is amazing</p>
        </div>
        {/* add comment */}
        <div className="add-comment">
        <MdOutlineMood />
        <input type="text" name="" placeholder="add a comment" id="" />
        <button className="post">Post</button>
        </div>
      </div>
    </div>
  );
  }

export default Home;
