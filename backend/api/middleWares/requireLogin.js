import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";

export default function RequireLogin (req,res,next){
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have logged in 1"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET , (err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must have logged in 2"})
        }
        const {_id} = payload;
        User.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })

}
