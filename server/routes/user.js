const express = require("express");
const router = express.Router();

// Connect to User controller
const userController = require("../controllers/user");

/* GET Route to fetch a single user - GET USER operation. */
router.get("/:id", userController.getSingleUser);

module.exports = router;
