const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

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
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
