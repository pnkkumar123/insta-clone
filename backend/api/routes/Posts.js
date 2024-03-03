import express from "express";
// import RequireLogin from "../middleWares/requireLogin.js";
import POST from '../models/Post.js'


const PostRouter = express.Router();

// routes
PostRouter.post("/createpost",(req,res)=>{
    const {title,body} = req.body;
   

    if(!body || !title){
        return res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user);
    const Post  = new POST ({
        body,
        title,
        postedBy:req.user
    })
    Post.save().then((result)=>{
        return res.json({post:result})
    }).catch(err=>console.log(err));
})

export {PostRouter}