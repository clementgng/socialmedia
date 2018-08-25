const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();

// Load register validation for user
const validateRegisterInput = require("../../validation/register");

// Load login validation for user
const validateLoginInput = require("../../validation/login");

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
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if there are any errors while validating registration
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }) // Find if there is an email in DB that is same as request email
    .then(user => {
      // mongoose async operations(save, find, insert, replace, etc) return promises
      if (user) {
        errors.email = "E-mail is already registered.";
        return res.status(400).json(errors); //res.status([status code]).json([msg goes here])
      } else {
        // create a new user from registration
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
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
  const { errors, isValid } = validateLoginInput(req.body);
  // Check if there are any errors while validating login
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }) // if names are same, can do this instead of {email: email}
    .then(user => {
      if (!user) {
        errors.email = "Incorrect email or password";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isSame => {
        if (isSame) {
          // User Matched, create the payload for the JWT from the User model
          // insert key-value pairs we want to send on payload from User model
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
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
          errors.password = "Email or password is invalid";
          return res.status(400).json(errors);
        }
      });
    });
});

// @route POST api/users/currentUser
// @desc Return the current user based off JWT token we sent
// @access Private
router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    });
  }
);
