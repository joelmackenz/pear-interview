const Question = require("../models/question");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./.env" });

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questions = [
  new Question({
    title: "title1",
    body: "body1",
    solution: "solution1",
    difficulty: 0,
  }),
  new Question({
    title: "title2",
    body: "body2",
    solution: "solution2",
    difficulty: 1,
  }),
  new Question({
    title: "title3",
    body: "body3",
    solution: "solution3",
    difficulty: 2,
  }),
  new Question({
    title: "title4",
    body: "body4",
    solution: "solution4",
    difficulty: 0,
  }),
  new Question({
    title: "title5",
    body: "body5",
    solution: "solution5",
    difficulty: 1,
  }),
  new Question({
    title: "title6",
    body: "body6",
    solution: "solution6",
    difficulty: 2,
  }),
  new Question({
    title: "title7",
    body: "body7",
    solution: "solution7",
    difficulty: 0,
  }),
  new Question({
    title: "title8",
    body: "body8",
    solution: "solution8",
    difficulty: 1,
  }),
  new Question({
    title: "title9",
    body: "body9",
    solution: "solution9",
    difficulty: 2,
  }),
];

let done = 0;
for (let i = 0; i < questions.length; i++) {
  questions[i].save(function (err, result) {
    done++;
    if (done === questions.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
