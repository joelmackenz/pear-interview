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
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Question from "../layout/Question";
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

function QuestionsDisplay(props) {
  const [question, setQuestion] = useState({});
  const classes = useStyles();

  useEffect(() => {
    console.log("first");
    console.log(props.id);
    const getQuestions = async () => {
      const res = await fetch(`/api/question/${props.id}`, {
        method: "get",
      });
      const question = await res.json();
      console.log(question);
      setQuestion(question);
    };

    getQuestions();
  }, []);

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Question question={question} />
      <Divider style={{ marginTop: "1rem" }} />
    </Grid>
  );
}

export default function FeedbackHistoryDialog(props) {
  const classes = useStyles();

  const open = props.open;

  useEffect(() => {
    props.setDialog(props.id);
  }, []);

  return (
    <Dialog
      maxWidth="md"
      fullWidth="true"
      open={open}
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
          Questions
        </Typography>
        <DialogContentText variant="subtitle1" style={{ alignSelf: "center" }}>
          From your interview on {props.date}
        </DialogContentText>

        <QuestionsDisplay id={props.question} />

        <DialogActions className={classes.feedbackActions}>
          <Button onClick={props.openSibling}>Next</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
