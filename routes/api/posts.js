/* routes/api/posts.js -- Backend API calls relating to a post
getting a specific post, 
getting all the posts
getting/creating/deleting posts
ability to comment or like posts
*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
// Load Post validation
const validatePostInput = require("../../validation/post");

module.exports = router;

// @route GET api/posts
// @desc Get all the posts in the network
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: "No posts found" }));
});

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      postContents: req.body.postContents,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePicture: req.body.profilePicture,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route GET api/posts/:post_id
// @desc Get a single post
// @access Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err =>
      res
        .status(404)
        .json({ post: "The post you are trying to access does not exist!" })
    );
});

// @route DELETE api/posts/:post_id
// @desc Delete a post
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check if this profile owns the post
          console.log(post.user);
          console.log(req.user.id);
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              unauthorized: "You are not authorized to delete this post!"
            });
          }
          // Delete the post
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res
            .status(404)
            .json({ post: "The post you are trying to access does not exist!" })
        );
    });
  }
);

// @route POST api/posts/like/:post_id
// @desc Like a specific post
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ post: "You have already liked this post!" });
          }
          // Add user id to the likes array in post
          post.likes.push({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ post: "The post you are trying to access does not exist!" })
        );
    });
  }
);

// @route DELETE api/posts/unlike/:post_id
// @desc Unlike a specific post
// @access Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          console.log("in");
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(400).json({
              post: "You cannot unlike a post which you have not liked"
            });
          }
          console.log("in2");
          // Add user id to the likes array in post
          console.log(post.likes);
          console.log(req.user.id);
          const idx = post.likes.findIndex(
            like => like.user.toString() === req.user.id
          );
          post.likes.splice(idx, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ post: "The post you are trying to access does not exist!" })
        );
    });
  }
);

// @route POST api/posts/comment/:post_id
// @desc Add a comment to a specific post
// @access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          postContents: req.body.postContents,
          user: req.user.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePicture: req.body.profilePicture
        };
        // Add to the comment array in Post object
        post.comments.push(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res
          .status(404)
          .json({ post: "You cannot comment on a post that does not exist!" })
      );
  }
);

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc Delete a specific comment to a specific post
// @access Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({
            comment: "You cannot delete a comment that does not exist"
          });
        }
        const idx = post.comments.findIndex(
          comment => comment._id.toString() === req.params.comment_id
        );
        post.comments.splice(idx, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res
          .status(404)
          .json({ post: "The post you are trying to access does not exist!" })
      );
  }
);
