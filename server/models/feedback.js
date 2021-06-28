const mongoose = require("mongoose");
const Feedback = new mongoose.Schema(
  {
    interview: {
      type: mongoose.ObjectId,
      required: true,
      ref: "interviews",
    },
    candidate: {
      type: mongoose.ObjectId,
      required: true,
      ref: "users",
    },
    overallScore: {
      type: Number,
      required: true,
    },
    communication: {
      type: Number,
      required: true,
    },
    codeEfficiency: {
      type: Number,
      required: true,
    },
    codeOrganization: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    debugging: {
      type: Number,
      required: true,
    },
    problemSolving: {
      type: Number,
      required: true,
    },
    didWell: {
      type: String,
    },
    canImprove: {
      type: String,
    },
    recommendedResources: {
      type: String,
    },
    additionalFeedback: {
      type: String,
    },
    experienceRating: {
      type: Number,
    },
    experienceDescription: {
      type: String,
    },
  },
  {
    collection: "feedbacks",
  }
);

module.exports = mongoose.model("Feedback", Feedback);
