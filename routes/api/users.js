const express = require("express");
const router = express.Router();

module.exports = router;

// @route GET api/users
// @desc Tests users route
// @access Public
router.get("/", (req, res) => res.json({ msg: "Users works" }));
