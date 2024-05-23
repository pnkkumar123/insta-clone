import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const H = () => {
    const [data ,setData]=  useState([])
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState("")
    const navigate= useNavigate()
    useEffect(()=>{
          const fetchData = async ()=>{
            try{
                const token = localStorage.getItem("jwt");
                if(!token){
                    navigate("/signin")
                    return;
                    }
                const response = await fetch("/allposts",{
                    headers:{
                        Authorization:"Bearer " + token
                    }
                });
                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result.post);
                console.log(result.post);
                
            }catch(error){
                console.error(error);
            }
          };
          fetchData();
    },[navigate])
    const toggleComment = (posts)=>{
        if(show){
            setShow(false)
            
        }else{
            setShow(true)
            setData(false)
        }
    }
    const likePost = (id)=>{
        
        fetch("http://localhost/like",{
            method: "put",
            headers:{
                "Content-Type": "application/json",
              Authorization :  "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id 
            })
        }).then(res=>res.json())
        .then((result)=>{
            const newData = data.map((posts)=>{
                if(posts._id === result._id){
                    return result;
                }else{
                    return posts;
                }
            });
            setData(newData);
        })
    };const unlikePost = (id)=>{
        fetch("http://localhost:5000/unlike",{
        method:"put" ,
        headers:{
                "Content-Type" : "application/json",
                Authorization : "Bearer " + localStorage.getItem("jwt")

            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>{
         if(!res.ok){
            throw new Error("failed to unlike post")
         }    
            res.json()
        })
        .then((result)=>{
            const newData = data.map((posts)=>{
                if(posts._id === result._id){
                    return result;
                }
                else{
                    return posts
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.error(err);
        })
    }
    // function to make comment
    const makeComment = (text,id)=>{
        fetch("http://localhost:5000/comment",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                Authorization:"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id,
                text:text
            })
        }).then(res=>{
            if(!res.ok){
              throw new Error("failed to fetch data")
            }
            res.json()
        }).then((result)=>{
        const newData = data.map((posts)=>{
            if(posts._id === result._id){
                return result
            }else{
                return posts
            }
        })
        setData(newData)
        setComment("")
    })
    }


  return (
    <div>H</div>
  )
}

export default H