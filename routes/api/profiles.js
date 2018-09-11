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
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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
      // grab these since findOne returns a promise which contains the user in req.user
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

// @route GET api/profile/handle/:handle
// @desc Get the profile by the handle
// @access Public
// /:[name goes here] goes under to req.params.[name goes here]
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["firstName", "lastName", "profilePicture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "The page you requested does not exist";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/id/:id
// @desc Get the profile of the id
// @access Public
// /:[name goes here] goes under to req.params.[name goes here]
router.get("/user/:id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["firstName", "lastName", "profilePicture"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "The page you requested does not exist";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/users
// @desc Get the profile of all users
// @access Public
// /:[name goes here] goes under to req.params.[name goes here]
router.get("/users", (req, res) => {
  Profile.find()
    .populate("user", ["firstName", "lastName", "profilePicture"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles that exist";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no profiles that exist" })
    );
});

// @route POST api/profile
// @desc Create or edit current user's profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
    if (req.body.industry) profileFields.industry = req.body.industry;
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

// @route POST api/profile/experience
// @desc Add experience to a user's profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to experience array
        profile.experience.unshift(newExp); // inset at beginning of list
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/profile/education
// @desc Add education to a user's profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          major: req.body.major,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to experience array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from a user's profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("in2");
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc Delete education from a user's profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        console.log("in");
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile
// @desc Delete a user and their profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
