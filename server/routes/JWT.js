const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require("../models/user");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/", authenticateJWT, async (req, res, next) => {
  const userId = req.user.user;
  const user = await User.findOne({ _id: userId });
  res.send(user);
});

module.exports = router;
