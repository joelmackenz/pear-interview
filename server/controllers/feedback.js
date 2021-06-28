// connect to the Feedback Model
const Feedback = require("../models/feedback");
const Interview = require("../models/interview");

module.exports.createFeedback = (req, res, next) => {
  const {
    interview,
    candidate,
    overallScore,
    communication,
    codeEfficiency,
    codeOrganization,
    speed,
    debugging,
    problemSolving,
    didWell,
    canImprove,
    recommendedResources,
    additionalFeedback,
    experienceRating,
    experienceDescription,
  } = req.body;

  const newFeedback = new Feedback({
    interview,
    candidate,
    overallScore,
    communication,
    codeEfficiency,
    codeOrganization,
    speed,
    debugging,
    problemSolving,
    didWell,
    canImprove,
    recommendedResources,
    additionalFeedback,
    experienceRating,
    experienceDescription,
  });

  newFeedback.save((err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({
        success: true,
        msg: "Successfully Created New Feedback",
      });
    }
  });
};

module.exports.getFeedbackList = async (req, res, next) => {
  const { user } = req.user;
  const feedbackList = await Feedback.find({ candidate: user });

  const feedbackListShort = await Promise.all(
    feedbackList.map(async (feedback) => {
      try {
        const interview = await Interview.findById(feedback.interview);
        const {
          codeEfficiency,
          codeOrganization,
          speed,
          debugging,
          problemSolving,
        } = feedback;
        const code = Math.round(
          (codeEfficiency +
            codeOrganization +
            speed +
            debugging +
            problemSolving) /
            5
        );
        return {
          date: interview.date,
          communication: feedback.communication,
          code,
          questions: interview.questions,
          id: feedback.id,
        };
      } catch (err) {
        throw err;
      }
    })
  );

  res.json(feedbackListShort);
};

module.exports.getSingleFeedback = (req, res, next) => {
  const id = req.params.id;

  Feedback.findById(id, (err, singleFeedback) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(singleFeedback);
    }
  });
};
