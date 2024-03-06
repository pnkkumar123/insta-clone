const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const keys = require('./keys/keys.js');

// Now you can access the MongoDB URI and JWT secret like this:
const mongoUrl = keys.mongoUrl;

const cors = require("cors");

app.use(cors())
require('./models/Model.js')
require('./models/Post.js')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})