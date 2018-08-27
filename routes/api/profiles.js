const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Profile
const User = require("../../models/User");
// Load profile validation
const validateProfileInput = require("../../validation/profile");

// @route GET api/profiles
// @desc Tests profiles route
// @access Public
// router.get("/", (req, res) => res.json({ msg: "Profile works" }));

// @route GET api/profile
// @desc Get current user's profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      // populate Profile user object with firstName, lastName, and profilePicture
      .populate("user", ["firstName", "lastName", "profilePicture"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create or edit current user's profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - split string into array input="X,Y,Z" output = [X,Y,Z]
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    // Object of objects
    profileFields.socialmedialinks = {};
    if (req.body.linkedin)
      profileFields.socialmedialinks.linkedin = req.body.linkedin;
    if (req.body.facebook)
      profileFields.socialmedialinks.facebook = req.body.facebook;
    if (req.body.instagram)
      profileFields.socialmedialinks.instagram = req.body.instagram;
    if (req.body.twitter)
      profileFields.socialmedialinks.twitter = req.body.twitter;

    // Find the user profile, then decide whether to edit an existing or create a  new one
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create a new profile
        //Check if the handle exists
        Profile.findOne({ handle: req.body.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              re.status(400).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          })
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

module.exports = router;
