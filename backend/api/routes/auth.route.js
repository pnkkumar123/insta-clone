import express from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post("/signup", async (req,res,next)=>{
    const {name,username,email,password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User ({name,username,email,password:hashedPassword})
   try{
    await newUser.save();
   res.status(201).json({message:"User created sucessfully"});
   }catch (e) {
    next(e);
}

})
authRouter.post("/signin", async (req,res,next)=>{
    const {email,password} = req.body;
    try{
      const validUser = await User.findOne({email});
      if(!validUser) return next ((404,'User not found'));
      const validPassword = bcryptjs.compareSync(password,validUser.password);
      if(!validPassword)  return next((404,'wrong credentials'))
      const {password:hashedPassword, ...rest} = validUser._doc ; 
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const age = new Date(Date.now() + 3600000);
       res.cookie('access_token',token,{httpOnly:true,expires: age},
       ).status(200)
       .json(rest);
          
    }catch(e){
        next(e)
    }
})
export {authRouter}