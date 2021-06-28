// connect to the Interview Model
const Interview = require("../models/interview");

module.exports.createInterview = (req, res, next) => {
  const { date, theme, questions, difficulty } = req.body;
  const { user } = req.user;
  console.log("User: " + JSON.stringify(user));

  const newInterview = new Interview({
    owner: user,
    date: date,
    theme: theme,
    questions: questions,
    difficulty: difficulty,
  });

  newInterview.save().then((err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(newInterview);
    }
  });
};

module.exports.getInterviewList = (req, res, next) => {
  const { user } = req.user;

  Interview.find(
    { $or: [{ owner: user }, { guest: user }] },
    (err, InterviewList) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.json(InterviewList);
      }
    }
  );
};

module.exports.getSingleInterview = (req, res, next) => {
  const id = req.params.id;
  console.log("int id:", id);

  Interview.findById(id, (err, singleInterview) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(singleInterview);
    }
  });
};

module.exports.updateInterview = (req, res, next) => {
  const id = req.params.id;
  const { owner, guest, date, theme, questions, difficulty } = req.body;
  const updatedInterview = Interview({
    _id: id,
    owner: owner,
    guest: guest,
    date: date,
    theme: theme,
    questions: questions,
    difficulty: difficulty,
  });

  Interview.updateOne({ _id: id }, updatedInterview, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ success: true, msg: "Successfully Updated Interview" });
    }
  });
};

module.exports.addInterviewGuest = (req, res, next) => {
  const id = req.params.id;
  const { user } = req.user;

  Interview.updateOne({ _id: id }, { $set: { guest: user } }, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ success: true, msg: "Successfully Updated Interview" });
    }
  });
};

module.exports.setStartInterview = (req, res, next) => {
  const id = req.params.id;

  Interview.updateOne({ _id: id }, { $set: { isStarted: true } }, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ success: true, msg: "Interview started" });
    }
  });
};

module.exports.deleteInterview = (req, res, next) => {
  const id = req.params.id;

  Interview.deleteOne({ _id: id }, (err, id) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({
        success: true,
        id: id,
        msg: "Successfully Deleted Interview",
      });
    }
  });
};
