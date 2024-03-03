import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        // required:true
      

    },
    photo:{
        type:String,
        // required:true
        default:"no photo"
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }

},{timestamps:true})

const POST = mongoose.model("POST",postSchema);
export default POST;