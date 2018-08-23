const express = require("express");
const router = express.Router();

module.exports = router;

// @route GET api/profiles
// @desc Tests profiles route
// @access Public
router.get("/", (req, res) => res.json({ msg: "Profile works" }));
