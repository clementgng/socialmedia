// server.js -- top level file which uses express, mongodb, express middleware for backend API calls for the web app
// test
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

//Grab the mongodb URI
const db = require("./config/keys").mongoURL;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => console.log(err));

const app = express();

/* Body parser middleware
bodyParser.urlencoded reutrns middleware that only parses urlencoded bodies and
only looks at requests where the Content-Type header matches the type option
If extended option is false, only accept object with key-value pairs where
the value is a string or array, else accept any data type*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config which contains the type of passport strategy and pass in passport to the config file
// Use passport to make endpoint routes public or private
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Set static assets if in production mode in heroku
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/build"));
  // Send the index.html in client if nothing else is used
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
