const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();

// Load User model
const User = require("../../models/User");

module.exports = router;

// @route GET api/users
// @desc Tests users route
// @access Public
router.get("/", (req, res) => res.json({ msg: "Users works" }));

// @route POST api/users/register
// @desc Register a user. Check if email exists. Hash the password with bcrypt and store it into the mongoDB
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }) // Find if there is an email in DB that is same as request email
    .then(user => {
      // mongoose async operations(save, find, insert, replace, etc) return promises
      if (user) {
        return res.status(400).json("E-mail is already registered."); //res.status([status code]).json([msg goes here])
      } else {
        // create a new user from registration
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          // use this link as a default profile picture for now
          profilePicture:
            "https://qph.fs.quoracdn.net/main-qimg-f879a085fc1d6803796ca9366cace73a.webp" //req.body.profilePicture
        });
        // generate the hash for the password, set the new user's new password as the hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser // mongoose async operations return promises
              .save() // newUser is a User model from mongoDB, can use save to update the new password
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route POST api/users/login
// @desc Login form for a user. Check if email exists and password is correct. Return JWT(JSON Web Token)
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }) // if names are same, can do this instead of {email: email}
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "Email or password is invalid" });
      }
      bcrypt.compare(password, user.password).then(isSame => {
        if (isSame) {
          // User Matched, create the payload for the JWT from the User model
          // insert key-value pairs we want to send on payload from User model
          const payload = {
            id: user.id,
            name: user.name,
            profilePicture: user.profilePicture
          };
          // Create and Sign the token and put the info onto the payload
          // jwt.sign(PAYLOAD, secretOrPrivateKey, [options, callback])
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                gotthetoken: true,
                token: "Bearer " + token // must be "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ password: "Email or password is invalid" });
        }
      });
    });
});

// @route POST api/users/currentUser
// @desc Return the current user so we can return JWT to current user
// @access Private
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
