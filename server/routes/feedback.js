const express = require("express");
const router = express.Router();

const auth = require("../middleware/authenticateJWT");

const feedbackController = require("../controllers/feedback");

/* POST Route to perform Creation - CREATE FEEDBACK operation. */
router.post("/", auth, feedbackController.createFeedback);

/* GET Route to fetch the list of feedbacks - GET LIST operation. */
router.get("/", auth, feedbackController.getFeedbackList);

/* GET Route to fetch a single feedback - GET FEEDBACK operation. */
router.get("/:id", auth, feedbackController.getSingleFeedback);

module.exports = router;
