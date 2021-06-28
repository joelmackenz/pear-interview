let express = require("express");
let router = express.Router();
const passport = require("passport");

const initPassport = require("../passport-config");
initPassport(passport);

const User = require("../models/user");

router.route("/").post((req, res, next) => {
  if (
    req.body.password.length >= 6 &&
    req.body.firstName !== null &&
    req.body.lastName !== null
  ) {
    User.register(
      new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }),
      req.body.password
    )
      .then(() => {
        res.statusCode = 201;
        res.setHeader("Content-Type", "text/html");
        res.send("Saved to database");
      })
      .catch((err) => {
        res.status(400).send("Unable to save to database: " + err);
      });
  } else {
    res.send(
      "Unable to save to database. Please ensure body includes names and a password >= 6 characters."
    );
  }
});

module.exports = router;
