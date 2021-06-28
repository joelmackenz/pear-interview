const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require("../models/user");

module.exports.getSingleUser = (req, res, next) => {
  const id = req.params.id;

  User.findById(id, (err, singleUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(singleUser);
    }
  });
};
