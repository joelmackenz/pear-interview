import React from "react";
import {
  Grid,
  FormLabel,
  TextField,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RubricBubble from "./RubricBubble";

const useStyles = makeStyles((theme) => ({
  dialogTitleEmbed: {
    fontSize: "1.25rem",
  },
  feedbackRadioContainer: {
    display: "flex",
  },
  feedbackRadioButton: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.5rem",
  },
  feedbackRadioLabel: {
    alignSelf: "center",
    width: "20%",
    fontSize: "1rem",
  },
  feedbackScoreTitleContainer: {
    marginLeft: "22.5%",
    width: "71.5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  feedbackScoreTitle: {
    textAlign: "center",
    width: "100px",
    color: theme.palette.primary.main,
  },
  feedbackQuestionTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    marginBottom: "4rem",
  },
}));

function TextQuestion(props) {
  const classes = useStyles();

  return (
    <Grid>
      <DialogTitle>
        <Typography
          className={classes.dialogTitleEmbed}
          display="inline"
          color="primary"
        >
          Question {props.questionNum}
        </Typography>{" "}
        / 6
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.feedbackQuestionTitle}>
          {props.question}
        </DialogContentText>
        <TextField
          onChange={props.onChange}
          value={props.value}
          autoFocus
          multiline
          rows={5}
          variant="outlined"
          margin="dense"
          id={props.id}
          label="Your answer..."
          fullWidth
        />
      </DialogContent>
    </Grid>
  );
}

function FeedbackRadioContainer(props) {
  const classes = useStyles();

  return (
    <Grid className={classes.feedbackRadioContainer}>
      <FormLabel component="label" className={classes.feedbackRadioLabel}>
        {props.label}
      </FormLabel>
      {props.children}
    </Grid>
  );
}

export default function FeedbackForm(props) {
  const classes = useStyles();

  switch (props.step) {
    case 1:
      return (
        <Grid>
          <DialogTitle>
            <Typography
              className={classes.dialogTitleEmbed}
              display="inline"
              color="primary"
            >
              Question 1
            </Typography>{" "}
            / 6
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.feedbackQuestionTitle}>
              Overall, how did this person do in the interview?
            </DialogContentText>
            <RubricBubble
              name="overallScore"
              numColumns={10}
              columnLabelToggle={true}
              leftLabel="Terrible"
              rightLabel="Perfect"
              score={props.scores.overallScore}
              setScores={props.setScores}
              onChange={(e) => {
                props.setScores((scores) => ({
                  ...scores,
                  overallScore: e.target.value,
                }));
              }}
            />
          </DialogContent>
        </Grid>
      );
    case 2:
      return (
        <Grid>
          <DialogTitle>
            <Typography
              className={classes.dialogTitleEmbed}
              display="inline"
              color="primary"
            >
              Question 2
            </Typography>{" "}
            / 6
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.feedbackQuestionTitle}>
              Submit a review of the candidate in the following categories:
            </DialogContentText>
            <Grid className={classes.feedbackScoreTitleContainer}>
              <Typography className={classes.feedbackScoreTitle}>
                Needs Improvement
              </Typography>
              <Typography className={classes.feedbackScoreTitle}>
                Satisfactory
              </Typography>
              <Typography className={classes.feedbackScoreTitle}>
                Good
              </Typography>
              <Typography className={classes.feedbackScoreTitle}>
                Great
              </Typography>
              <Typography className={classes.feedbackScoreTitle}>
                Excellent
              </Typography>
            </Grid>
            <FeedbackRadioContainer label="Communication Skills">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.communication}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    communication: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
            <FeedbackRadioContainer label="Code Efficiency">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.codeEfficiency}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    codeEfficiency: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
            <FeedbackRadioContainer label="Code Organization">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.codeOrganization}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    codeOrganization: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
            <FeedbackRadioContainer label="Speed">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.speed}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    speed: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
            <FeedbackRadioContainer label="Debugging skills">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.debugging}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    debugging: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
            <FeedbackRadioContainer label="Problem solving skills">
              <RubricBubble
                name="interviewee-review"
                numColumns={5}
                score={props.scores.problemSolving}
                setScores={props.setScores}
                onChange={(e) => {
                  props.setScores((scores) => ({
                    ...scores,
                    problemSolving: e.target.value,
                  }));
                }}
              />
            </FeedbackRadioContainer>
          </DialogContent>
        </Grid>
      );
    case 3:
      return (
        <TextQuestion
          questionNum={3}
          question={
            "What are some things this candidate did well? (The more specific the better)"
          }
          onChange={(e) => {
            props.setScores((scores) => ({
              ...scores,
              didWell: e.target.value,
            }));
          }}
          value={props.scores.didWell}
          id="didWell"
        />
      );
    case 4:
      return (
        <TextQuestion
          questionNum={4}
          question={
            "What are some things this candidate can improve on? (The more specific the better)"
          }
          onChange={(e) => {
            props.setScores((scores) => ({
              ...scores,
              canImprove: e.target.value,
            }));
          }}
          value={props.scores.canImprove}
          id="canImprove"
        />
      );
    case 5:
      return (
        <TextQuestion
          questionNum={5}
          question={
            "Any recommendations on resources that can help this candidate improve?"
          }
          onChange={(e) => {
            props.setScores((scores) => ({
              ...scores,
              recommendedResources: e.target.value,
            }));
          }}
          value={props.scores.recommendedResources}
          id="recommendedResources"
        />
      );
    case 6:
      return (
        <TextQuestion
          questionNum={6}
          question={"Anything else?"}
          onChange={(e) => {
            props.setScores((scores) => ({
              ...scores,
              additionalFeedback: e.target.value,
            }));
          }}
          value={props.scores.additionalFeedback}
          id="additionalFeedback"
        />
      );
    default:
  }
}
