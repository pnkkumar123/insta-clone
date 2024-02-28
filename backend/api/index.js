import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
dotenv.config();


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to mongoDB");
})
.catch((error)=>{
    console.log(error);
})
const app = express();
app.use(express.json());
app.use(cors())

app.listen(3000,()=>{
    console.log('Server listening on port');
})

app.use("/api/user",router);
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status (statusCode).json({
        sucess:false,
        message,
        statusCode,
    })
})