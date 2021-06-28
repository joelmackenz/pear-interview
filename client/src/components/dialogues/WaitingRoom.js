import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Avatar, Card, CardHeader } from "@material-ui/core";
import facePhotoBoy from "../../images/face-pic-boy.png";
import facePhotoGirl from "../../images/face-pic-girl.png";
import { UserContext } from "../../context/UserContext";
import copy from "copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  dialogWidth: {
    minWidth: "700px",
    paddingLeft: "4rem",
    paddingTop: "1.8rem",
  },
  particpantsContent: {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: "2px",
    marginLeft: "0.5rem",
    width: "80%",
  },
  avatarPhoto: {
    paddingBottom: 0,
    marginLeft: "1.5rem",
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
  const { children, classes, onClose, user, owner, ...other } = props;

  return (
    <>
      {onClose && user._id === owner._id ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography className={classes.dialogTitle} variant="h5">
          {children}
        </Typography>
      </MuiDialogTitle>
    </>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0,
    "& .MuiFormControl-root": {
      marginTop: "0.5rem",
    },
    "& .MuiFormHelperText-root": {
      fontWeight: "bold",
      fontSize: "0.8rem",
    },
    "& .MuiInputBase-input": {
      color: theme.palette.grey[600],
    },
    "& .MuiButton-root": {
      margin: "2rem 0 0 0.5rem",
      borderRadius: "30px",
      padding: "1rem 3rem",
    },
    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
    "& .MuiCardHeader-title": {
      color: theme.palette.grey[600],
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    marginLeft: "0.5rem",
    padding: theme.spacing(1),
    justifyContent: "flex-start",
    "& .MuiButton-root": {
      borderRadius: "30px",
      padding: "1rem 3rem",
    },
    marginBottom: "4rem",
  },
}))(MuiDialogActions);

const ShareLink = withStyles(styles)(
  ({ user, owner, interviewId, copyLinkToClipboard }) => {
    if (user._id === owner._id) {
      return (
        <Grid container item direction="row">
          <Grid container item md={6}>
            <FormHelperText>Share link</FormHelperText>
            <TextField
              fullWidth
              inputProps={{ readOnly: true }}
              id="outlined-helperText"
              variant="outlined"
              value={`http://localhost:3000/interview/${interviewId}`}
            />
          </Grid>
          <Grid container item md={4}>
            <Button
              onClick={copyLinkToClipboard}
              autoFocus
              size="large"
              variant="contained"
              color="primary"
            >
              copy
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return null;
    }
  }
);

const StartButton = withStyles(styles)(
  ({ user, owner, interviewId, setOpen }) => {
    const { socket } = useContext(SocketContext);
    const history = useHistory();
    const startInterview = () => {
      if (socket) {
        socket.emit("startInterview", { interviewId });
      }
      axios
        .put(`/api/interview/start/${interviewId}`)
        .catch((err) => console.log(err));
    };

    const goToInterview = () => {
      history.push(`/interview/${interviewId}`);
      setOpen(false);
    };

    if (user._id === owner._id) {
      return (
        <Button
          autoFocus
          onClick={() => {
            startInterview();
            goToInterview();
          }}
          size="large"
          variant="contained"
          color="primary"
        >
          start
        </Button>
      );
    } else {
      return <p>Waiting for interview owner to start</p>;
    }
  }
);

export default function WaitingRoom({ id, open, setOpen }) {
  const classes = useStyles();
  const { user, newlyCreatedInterview } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [guest, setGuest] = useState({ _id: null, name: null });
  const [owner, setOwner] = useState({ _id: null, name: null });
  const [guestEnter, setGuestEnter] = useState(true);

  let interviewId;

  if (newlyCreatedInterview !== null) {
    interviewId = newlyCreatedInterview._id;
  } else {
    interviewId = id;
  }

  const copyLinkToClipboard = (e) => {
    copy(`http://localhost:3000/interview/${interviewId}`);
    setShowCopyNotification(true);
  };

  const handleClose = () => {
    setGuest({ _id: null, name: null });
    setOwner({ _id: null, name: null });
    setOpen(false);
  };

  const closeCopyNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowCopyNotification(false);
  };

  useEffect(() => {
    if (open && interviewId !== null && interviewId !== "") {
      axios
        .get(`/api/interview/${interviewId}`)
        .then((res) => {
          // If there is a guest in the interview object from the database...
          if (res.data.guest) {
            axios
              .get(`/api/user/${res.data.guest}`)
              .then((res) => {
                // Set the guest state to that guest from the database
                setGuest({ _id: res.data._id, name: res.data.firstName });
              })
              .catch((err) => console.log(err));
          } else {
            // If there is no guest, and you are not the host, add your info to DB as guest, and to the guest state
            if (res.data.owner !== undefined && res.data.owner !== user._id) {
              axios
                .put(`/api/interview/guest/${interviewId}`, {
                  user: user,
                })
                .catch((err) => console.log(err));
              setGuest({ _id: user._id, name: user.firstName });
            } else {
              console.log("No guest in room yet.");
            }
          }
          // Otherwise, set the owner state to the owner from the DB
          axios.get(`/api/user/${res.data.owner}`).then((res) => {
            setOwner({ _id: res.data._id, name: res.data.firstName });
          });
        })
        .catch((err) => console.log(err));
    }
  }, [open, guestEnter]);

  useEffect(() => {
    if (socket) {
      socket.on("joinWaitingRoom", () => {
        setGuestEnter((prevState) => !prevState);
      });
    }
    return () => {
      if (socket) {
        socket.off("joinWaitingRoom");
      }
    };
  }, []);

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogWidth }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          user={user}
          owner={owner}
        >
          Waiting Room
        </DialogTitle>
        <DialogContent>
          <Grid container item direction="column" spacing={2}>
            <ShareLink
              user={user}
              owner={owner}
              interviewId={interviewId}
              copyLinkToClipboard={copyLinkToClipboard}
            />
            <Grid container item direction="column" spacing={2}>
              <Grid container item>
                <Typography variant="h6" color="primary">
                  Participants
                </Typography>
              </Grid>
              <Grid container item className={classes.particpantsContent}>
                <Card elevation={0} style={{ paddingBottom: "1rem" }}>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe" src={facePhotoBoy} />}
                    title={owner.name + " - Owner"}
                    className={classes.avatarPhoto}
                  />
                  {guest._id ? (
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" src={facePhotoGirl} />
                      }
                      title={guest.name}
                      className={classes.avatarPhoto}
                    />
                  ) : (
                    ""
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <StartButton
            user={user}
            owner={owner}
            interviewId={interviewId}
            setOpen={setOpen}
          />
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className={classes.snackbarColor}
        open={showCopyNotification}
        autoHideDuration={6000}
        onClose={closeCopyNotification}
        message="link copied!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeCopyNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
