const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
const keys = require('../keys/keys.js');

// Now you can access the MongoDB URI and JWT secret like this:

const Jwt_secret = keys.Jwt_secret;
const requireLogin = require("../middleWares/requireLogin.js");

router.get('/', (req, res) => {
    res.send("hello")
})

router.post("/signup", (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !email || !username || !password) {
        return res.status(422).json({ error: "Please fill in all fields" });
    }

    USER.findOne({ $or: [{ email: email }, { username: username }] })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email or userName" });
            }

            bcryptjs.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new USER({
                        name,
                        email,
                        username,
                        password: hashedPassword
                    });

                    user.save()
                        .then(user => { 
                            res.status(201).json({ message: "Registered successfully" }); // 201 Created
                        })
                        .catch(err => { 
                            res.status(500).json({ error: "Internal Server Error" }); // 500 Internal Server Error
                            console.log(err); 
                        });
                })
                .catch(err => { 
                    res.status(500).json({ error: "Internal Server Error" }); // 500 Internal Server Error
                    console.log(err); 
                });
        })
        .catch(err => { 
            res.status(500).json({ error: "Internal Server Error" }); // 500 Internal Server Error
            console.log(err); 
        });
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }

    USER.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email" });
            }

            bcryptjs.compare(password, savedUser.password)
                .then((match) => {
                    if (match) {
                        const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
                        const { _id, name, email, userName } = savedUser;
                        res.json({ token, user: { _id, name, email, userName } });
                    } else {
                        return res.status(422).json({ error: "Invalid password" });
                    }
                })
                .catch(err => { 
                    res.status(500).json({ error: "Internal Server Error" }); // 500 Internal Server Error
                    console.log(err); 
                });
        })
        .catch(err => { 
            res.status(500).json({ error: "Internal Server Error" }); // 500 Internal Server Error
            console.log(err); 
        });
});


module.exports = router;