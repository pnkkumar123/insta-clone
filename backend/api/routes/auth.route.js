import express from 'express';
import User from '../models/user.model.js';


import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const authRouter = express.Router();

authRouter.post("/signup",(req,res)=>{
    const {name,userName,email,password} = req.body;
    if(!name || !email || !userName || !password){
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with that email or userName"})
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user = new User({
                name,
                email,
                username,
                password:hashedPassword
            })
            user.save()
            .then(user=>{res.json({message:"Registered successfully"})})
            .catch(err=>{console.log(err)})
        })
    })
})

authRouter.post("/signin",(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                const token = jwt.sign({_id:savedUser.id},process.env.JWT_SECRET)
                const {_id,name,email,userName} = savedUser;
                res.json({token,user:{_id,name,email,userName}})
                console.log({token,user:{_id,name,email,userName}});
            }else{
                return res.status(422).json({error:"Invalid password"})
            
            }
        })
        .catch(err=>console.log(err));
    })
})
export {authRouter}