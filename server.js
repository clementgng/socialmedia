const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

//Grab the mongodb URI
const db = require("./config/keys").mongoURL;

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
