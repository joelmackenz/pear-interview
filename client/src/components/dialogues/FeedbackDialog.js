import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";

import FeedbackForm from "./FeedbackForm";

const useStyles = makeStyles((theme) => ({
  feedbackExit: {
    marginTop: ".5rem",
    borderRadius: "50px",
    width: "10px",
    alignSelf: "flex-end",
  },
  feedbackTitle: {
    alignSelf: "center",
    color: theme.palette.primary.main,
    padding: "1rem",
    marginTop: "1rem",
  },
  feedbackContent: {
    alignSelf: "center",
  },
  feedbackActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackButton: {
    marginTop: "1rem",
    padding: ".5rem",
    borderRadius: "50px",
    width: "20%",
    marginBottom: "2rem",
  },
}));

export default function FeedbackDialog(props) {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const [scores, setScores] = useState({
    overallScore: "5",
    communication: "",
    codeEfficiency: "",
    codeOrganization: "",
    speed: "",
    debugging: "",
    problemSolving: "",
    didWell: "",
    canImprove: "",
    recommendedResources: "",
    additionalFeedback: "",
  });
  const [step, setStep] = useState(1);
  const open = props.open;

  const incrementStep = () => {
    setStep(step + 1);
  };

  const decrementStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const createFeedback = async () => {
      axios.defaults.withCredentials = true;

      const interview = await axios.get(`/api/interview/${props.interviewId}`);
      const participants = [interview.data.owner, interview.data.guest];
      const candidate = participants.find((p) => p !== user._id);

      axios.post("/api/feedback", {
        interview: props.interviewId,
        candidate,
        overallScore: scores.overallScore,
        communication: scores.communication,
        codeEfficiency: scores.codeEfficiency,
        codeOrganization: scores.codeOrganization,
        speed: scores.speed,
        debugging: scores.debugging,
        problemSolving: scores.problemSolving,
        didWell: scores.didWell,
        canImprove: scores.canImprove,
        recommendedResources: scores.recommendedResources,
        additionalFeedback: scores.additionalFeedback,
      });
    };

    createFeedback();

    // Save to database here

    setScores({
      overallScore: "5",
      communication: "",
      codeEfficiency: "",
      codeOrganization: "",
      speed: "",
      debugging: "",
      problemSolving: "",
      didWell: "",
      canImprove: "",
      recommendedResources: "",
      additionalFeedback: "",
    });
    setStep(1);
    props.handleClose();
  };

  let continueButton;

  if (step === 6) {
    continueButton = (
      <Button
        className={classes.feedbackButton}
        type="submit"
        id="form-submit"
        variant="contained"
        color="primary"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
    );
  } else {
    continueButton = (
      <Button
        className={classes.feedbackButton}
        id="form-continue"
        variant="contained"
        color="primary"
        onClick={incrementStep}
      >
        Next Question
      </Button>
    );
  }

  return (
    <Dialog
      className={classes.feedbackMain}
      maxWidth="md"
      fullWidth={true}
      open={open}
      onClose={props.handleClose}
      aria-labelledby="feedback-form"
    >
      <Button className={classes.feedbackExit} onClick={props.handleClose}>
        X
      </Button>
      <Typography
        variant="h4"
        className={classes.feedbackTitle}
        id="feedback-form"
      >
        Give Us Your Feedback
      </Typography>
      <DialogContentText variant="subtitle1" style={{ alignSelf: "center" }}>
        Please leave your comments here:
      </DialogContentText>
      <DialogContent>
        <FeedbackForm step={step} scores={scores} setScores={setScores} />
        <DialogActions className={classes.feedbackActions}>
          {step > 1 && (
            <Button
              className={classes.feedbackButton}
              id="form-backwards"
              variant="outlined"
              onClick={decrementStep}
            >
              Previous Question
            </Button>
          )}
          {continueButton}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
