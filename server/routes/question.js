const express = require("express");
const router = express.Router();

const auth = require("../middleware/authenticateJWT");

const questionController = require("../controllers/question");

// fetch a single question based on difficulty level
router.post("/", auth, questionController.getSingleQuestionByDifficulty);

// fetch a single question based on question id
router.get("/:id", auth, questionController.getSingleQuestionById);

// fetch the assigned question of an specific interview room
router.post(
  "/:interviewId",
  auth,
  questionController.getQuestionOfInterviewRoom
);

module.exports = router;
