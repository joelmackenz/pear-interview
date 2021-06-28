const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
});

const Question = model("question", QuestionSchema);

module.exports = Question;
