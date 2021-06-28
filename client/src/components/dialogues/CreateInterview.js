import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  dialogWidth: {
    minWidth: "400px",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogTitle: {
    marginTop: "2rem",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography align="center" className={classes.dialogTitle} variant="h5">
          {children}
        </Typography>
      </MuiDialogTitle>
    </>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiFormHelperText-root": {
      marginBottom: "0.4rem",
    },
    marginRight: "5rem",
    marginLeft: "5rem",
    "& .MuiSelect-select": {
      textAlign: "center",
      fontWeight: "bold",
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: "auto",
    "& .MuiButton-root": {
      borderRadius: "30px",
      padding: "1rem 3rem",
    },
    marginBottom: "4rem",
  },
}))(MuiDialogActions);

export default function CreateInterviewDialogs({ open, setOpen }) {
  const classes = useStyles();

  const {
    upcomingInterviews,
    setUpcomingInterviews,
    setWaitingRoomOpen,
    setNewlyCreatedInterview,
    setDifficulty,
  } = useContext(UserContext);

  const [difficultyLevel, setDifficultyLevel] = useState("0");

  const createInterview = async () => {
    const questionRes = await fetch("/api/question", {
      method: "post",
      body: JSON.stringify({ difficulty: parseInt(difficultyLevel) }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const question = await questionRes.json();
    const newInterview = {
      date: new Date(),
      questions: [question._id],
      difficulty: parseInt(difficultyLevel),
    };
    setDifficulty(parseInt(difficultyLevel));
    const interviewRes = await fetch("api/interview", {
      method: "post",
      body: JSON.stringify(newInterview),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const interviewObjFromDB = await interviewRes.json();
    setUpcomingInterviews([...upcomingInterviews, interviewObjFromDB]);
    setNewlyCreatedInterview(interviewObjFromDB);
    setOpen(false);
    setWaitingRoomOpen(true);
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogWidth }}
        onClose={(e) => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={(e) => setOpen(false)}
        >
          Create
        </DialogTitle>
        <DialogContent>
          <FormHelperText>Difficulty level</FormHelperText>
          <FormControl variant="outlined">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              defaultValue="0"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <MenuItem value="0">easy</MenuItem>
              <MenuItem value="1">medium</MenuItem>
              <MenuItem value="2">hard</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={createInterview}
            size="large"
            variant="contained"
            color="primary"
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
