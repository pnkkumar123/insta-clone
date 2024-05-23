const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const keys = require('./api/keys/keys.js');
const path = require('path');
// Now you can access the MongoDB URI and JWT secret like this:
const mongoUrl = keys.mongoUrl;

const cors = require("cors");

app.use(cors())
require('./api/models/Model.js')
require('./api/models/Post.js')
app.use(express.json())
app.use(require("./api/routes/auth.js"))
app.use(require("./api/routes/createPost.js"))
app.use(require("./api/routes/user.js"))
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
// deployment
const __dirname1 = path.resolve();

if ("production" === "production") {
  app.use(express.static(path.join(__dirname1, "/instaclone/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "instaclone", "dist", "index.html"))
  );


} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
