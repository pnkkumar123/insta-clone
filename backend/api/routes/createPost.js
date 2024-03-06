const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleWares/requireLogin.js");
const { route } = require("./auth");
const POST = mongoose.model("POST")


// Route
router.get("/allposts",requireLogin,(req,res)=>{
    POST.find()
    .populate("postedBy","_id name")
    .then(post=>res.json({post}))
    .catch(err=>console.log(err))
})

router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})
router.get("/myposts",requireLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>{
        res.json(myposts)
    })
})
router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id }
    },
    {
      new: true
    }
  )
  .populate("postedBy", "_id name Photo")
  .exec() // Removed the callback function
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(422).json({ error: err });
  });
});
router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id }
    },
    {
      new: true
    }
  )
  .populate("postedBy", "_id name Photo")
  .exec() // Removed the callback function
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(422).json({ error: err });
  });
});
router.put("/comment",requireLogin,(req,res)=>{
  const comment={
    comment:req.body.text,
    postedBy:req.user._id
  }
  POST.findByIdAndUpdate(req.body.postId,{
    $push:{comments:comment}
  },{
    new:true
  })
  .populate("comments.postedBy","_id name")
  .populate("postedBy","_id name Photo")
  .exec() // Removed the callback function
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(422).json({ error: err });
  });
})







module.exports = router