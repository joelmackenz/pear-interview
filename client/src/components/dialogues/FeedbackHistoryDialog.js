import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  CircularProgress,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  feedbackMain: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  feedbackExit: {
    borderRadius: "50px",
    width: "10px",
    alignSelf: "flex-end",
    position: "absolute",
  },
  feedbackExit: {
    marginTop: "0.5rem",
    borderRadius: "50px",
    width: "10px",
    alignSelf: "flex-end",
    position: "absolute",
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
    padding: "0.5rem",
    borderRadius: "50px",
    width: "20%",
    marginBottom: "2rem",
  },
  pointsDisplayHeader: {
    height: "110px",
    width: "150px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: "1.15rem",
  },
  pointsDisplayCircleContainer: {
    height: "110px",
    width: "150px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  pointsDisplayNumbersContainer: {
    fontSize: "1.25rem",
    position: "absolute",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "110px",
    width: "150px",
  },
  bottomProgCircle: {
    color: "#CCCCCC",
    position: "absolute",
  },
  topProgCircle: {
    color: theme.palette.primary.light,
    position: "absolute",
  },
  feedbackDisplayItem: {
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
}));

function PointsDisplay(props) {
  const classes = useStyles();

  const getPercent = (ratingNumber, total) => {
    const float = parseFloat(ratingNumber);
    const percent = (float / total) * 100;
    return percent;
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const value = getPercent(props.score, props.outOf);
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= value ? value : prevProgress + 5
      );
    }, 50);
  }, [props.score]);

  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      <Typography className={classes.pointsDisplayHeader}>
        {props.scoreTitle}
      </Typography>
      <Grid className={classes.pointsDisplayCircleContainer}>
        <CircularProgress
          className={classes.bottomProgCircle}
          variant="determinate"
          size="100px"
          color="secondary"
          thickness={4}
          value={100}
        />
        <Typography className={classes.pointsDisplayNumbersContainer}>
          {props.score} / {props.outOf}
        </Typography>
        <CircularProgress
          className={classes.topProgCircle}
          variant="determinate"
          size="100px"
          thickness={4}
          value={progress}
        />
      </Grid>
    </Grid>
  );
}

function FeedbackDisplay(props) {
  const classes = useStyles();

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" className={classes.feedbackDisplayItem}>
        {props.questionNum}. {props.questionTitle}
      </Typography>
      <Box overflow="auto">
        <Typography className={classes.feedbackDisplayItem}>
          "{props.feedback}"
        </Typography>
      </Box>
      <Divider style={{ marginTop: "1rem" }} />
    </Grid>
  );
}

export default function FeedbackHistoryDialog(props) {
  const classes = useStyles();
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    props.setDialog(props.id);
    const getFeedback = async () => {
      const feedbackDb = await axios.get(`api/feedback/${props.id}`);
      setFeedback(feedbackDb.data);
    };

    getFeedback();
  }, []);

  return (
    <Dialog
      maxWidth="md"
      fullWidth="true"
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogContent className={classes.feedbackMain}>
        <Button className={classes.feedbackExit} onClick={props.handleClose}>
          <CloseIcon />
        </Button>
        <Typography
          variant="h4"
          className={classes.feedbackTitle}
          id="feedback-form"
        >
          Your Feedback
        </Typography>
        <DialogContentText variant="subtitle1" style={{ alignSelf: "center" }}>
          From your interview on {props.date}
        </DialogContentText>
        <Grid style={{ display: "flex", marginTop: "1rem" }}>
          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <PointsDisplay
              open={props.animate}
              score={feedback.overallScore}
              scoreTitle="Overall Score"
              outOf={10}
            />
            <PointsDisplay
              open={props.animate}
              score={feedback.codeEfficiency}
              scoreTitle="Code Efficiency"
              outOf={5}
            />
            <PointsDisplay
              open={props.animate}
              score={feedback.communication}
              scoreTitle="Communication"
              outOf={5}
            />
            <PointsDisplay
              open={props.animate}
              score={feedback.debugging}
              scoreTitle="Debugging"
              outOf={5}
            />
            <PointsDisplay
              open={props.animate}
              score={feedback.problemSolving}
              scoreTitle="Problem Solving"
              outOf={5}
            />
            <PointsDisplay
              open={props.animate}
              score={feedback.speed}
              scoreTitle="Speed"
              outOf={5}
            />
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1.5rem",
            }}
          >
            <Divider />
            <FeedbackDisplay
              questionNum={1}
              questionTitle={"What are some things this candidate did well?"}
              feedback={feedback.didWell}
            />
            <FeedbackDisplay
              questionNum={2}
              questionTitle={
                "What are some things this candidate can improve on?"
              }
              feedback={feedback.canImprove}
            />
            <FeedbackDisplay
              questionNum={3}
              questionTitle={
                "Any recommendations on resources that can help this candidate improve?"
              }
              feedback={feedback.recommendedResources}
            />
            <FeedbackDisplay
              questionNum={4}
              questionTitle={"Anything else?"}
              feedback={feedback.additionalFeedback}
            />
          </Grid>
        </Grid>
        <DialogActions className={classes.feedbackActions}>
          <Button onClick={props.openSibling}>Previous</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
