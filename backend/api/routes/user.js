const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requireLogin = require("../middleWares/requireLogin.js");

// Get user profile
router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .exec()
                .then(posts => {
                    res.json({ user, posts });
                })
                .catch(err => {
                    return res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch(err => {
            return res.status(500).json({ error: "Internal Server Error" });
        });
});

// Follow a user
router.put("/follow", requireLogin, async (req, res) => {
    try {
        const followedUser = await USER.findByIdAndUpdate(req.body.followId, { $push: { followers: req.user._id } }, { new: true });
        const followingUser = await USER.findByIdAndUpdate(req.user._id, { $push: { following: req.body.followId } }, { new: true });
        res.json({ followedUser, followingUser });
    } catch (err) {
        return res.status(422).json({ error: "Failed to follow user" });
    }
});

// Unfollow a user
router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        const unfollowedUser = await USER.findByIdAndUpdate(req.body.followId, { $pull: { followers: req.user._id } }, { new: true });
        const unfollowingUser = await USER.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.followId } }, { new: true });
        res.json({ unfollowedUser, unfollowingUser });
    } catch (err) {
        return res.status(422).json({ error: "Failed to unfollow user" });
    }
});

// Upload profile picture
router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(req.user._id, { $set: { photo: req.body.photo } }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        return res.status(422).json({ error: "Failed to upload profile picture" });
    }
});

module.exports = router;
