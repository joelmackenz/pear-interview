import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import Grid from "@material-ui/core/Grid";

import CodeEditor from "../components/layout/CodeEditor";
import Question from "../components/layout/Question";
import Console from "../components/layout/Console";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import FeedbackDialog from "../components/dialogues/FeedbackDialog";
import RoomBlockDialog from "../components/dialogues/RoomBlockDialog";
import WaitingRoom from "../components/dialogues/WaitingRoom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toggleGroup: {
    flex: 2,
  },
  toggle: {
    color: theme.palette.background.paper,
    borderColor: theme.palette.action.disabled,
    "&.Mui-selected ": {
      backgroundColor: theme.palette.text.disabled,
      color: theme.palette.background.paper,
    },
  },
  btn: {
    borderRadius: "30px",
  },
  codeContainer: {
    overflowY: "scroll",
    backgroundColor: "#263238",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const Interview = (props) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [code, setCode] = useState("");
  const [results, setResults] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [barHeight, setBarHeight] = useState(0);
  const [roomBlockOpen, setRoomBlockOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const barRef = useRef(null);
  const history = useHistory();

  const classes = useStyles();

  const { user } = useContext(UserContext);

  const interviewId = props.match.params.id;

  const { socket } = useContext(SocketContext);

  const {
    upcomingInterviews,
    WaitingRoomOpen,
    setWaitingRoomOpen,
    interviewIsStarted,
    setInterviewIsStarted,
  } = useContext(UserContext);

  useEffect(() => {
    barRef.current && setBarHeight(barRef.current.clientHeight);
  }, [barRef]);

  useEffect(() => {
    const getAssignedQuestionOfInterviewRoom = async () => {
      const res = await fetch(`/api/question/${interviewId}`, {
        method: "post",
        body: JSON.stringify({ interviewId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const question = await res.json();
      setQuestion(question);
    };

    getAssignedQuestionOfInterviewRoom();
  }, [interviewId]);

  useEffect(() => {
    if (socket) {
      axios
        .get(`/api/interview/${interviewId}`)
        .then((res) => {
          if (
            // If you are not the guest or the owner, RoomBlock opens
            res.data.guest !== undefined &&
            res.data.guest !== user._id &&
            res.data.owner !== user._id
          ) {
            setRoomBlockOpen(true);
            console.log("This room already has the maximum number of members!");
          } else {
            socket.emit(
              "joinWaitingRoom",
              { interviewId },
              (axios.defaults.withCredentials = true)
            );
            socket.emit("joinInterviewRoom", { interviewId });
            if (res.data.owner !== user._id) {
              axios
                .put(`/api/interview/guest/${interviewId}`, {
                  user: user,
                })
                .catch((err) => console.log(err));
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      history.push({
        pathname: "/signin",
        state: interviewId,
      });
    }
    return () => {
      if (socket) {
        socket.emit("leaveInterviewRoom", { interviewId });
        socket.emit("leaveWaitingRoom", { interviewId });
      }
    };
  }, [history, interviewId, socket]);

  useEffect(() => {
    axios
      .get(`/api/interview/${interviewId}`)
      .then((res) => {
        if (res.data.isStarted) {
          setWaitingRoomOpen(false);
        } else {
          setWaitingRoomOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("startInterview", () => {
        console.log("Interview started.");
        setInterviewIsStarted(true);
        setWaitingRoomOpen(false);
      });
      socket.on("code", (code) => {
        setCode(code);
      });
      socket.on("compile", (result) => {
        setResults(result);
      });
      socket.on("language", (language) => {
        setLanguage(language);
      });
    }
    return () => {
      if (socket) {
        socket.off("startInterview");
        socket.off("code");
        socket.off("compile");
        socket.off("language");
      }
    };
  }, [WaitingRoomOpen, interviewIsStarted]);

  useEffect(() => {
    if (socket) {
      socket.on("code", (code) => {
        setCode(code);
      });
      socket.on("compile", (result) => {
        setResults(result);
      });
      socket.on("language", (language) => {
        setLanguage(language);
      });
    }
    return () => {
      if (socket) {
        socket.off("code");
        socket.off("compile");
        socket.off("language");
      }
    };
  }, []);

  const handleFeedbackOpenClose = () => {
    setFeedbackOpen((prevState) => !prevState);
  };

  const handleRoomBlockClose = () => {
    setRoomBlockOpen(false);
  };

  const handleClose = () => {
    props.history.push("/dashboard");
  };

  const compileCode = async () => {
    setResults("compiling...");
    socket.emit("compile", "compiling...");
    let extension = "js";
    switch (language) {
      case "python":
        extension = "py";
        break;
      case "java":
        extension = "java";
        break;
      default:
        break;
    }
    const result = await axios.post(`/api/compiler/${language}`, {
      files: [
        {
          name: `Main.${extension}`,
          content: code,
        },
      ],
    });

    setResults(result.data.stderr || result.data.stdout);
    socket.emit("compile", result.data.stderr || result.data.stdout);
  };

  const handleCodeChange = (code) => {
    setCode(code);
    socket.emit("code", code);
  };

  const handleToggleChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
      socket.emit("language", newLanguage);
    }
  };

  return (
    <React.Fragment>
      <AppBar ref={barRef} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`Interview ${props.match.params.id}`}
          </Typography>
          <ToggleButtonGroup
            size="small"
            value={language}
            exclusive
            onChange={handleToggleChange}
            className={classes.toggleGroup}
          >
            <ToggleButton value="javascript" className={classes.toggle}>
              JavaScript
            </ToggleButton>
            <ToggleButton value="python" className={classes.toggle}>
              Python
            </ToggleButton>
            <ToggleButton value="java" className={classes.toggle}>
              Java
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            color="inherit"
            onClick={handleFeedbackOpenClose}
            className={classes.btn}
            variant="outlined"
          >
            save
          </Button>
          <FeedbackDialog
            open={feedbackOpen}
            interviewId={interviewId}
            handleClose={handleFeedbackOpenClose}
          />
        </Toolbar>
      </AppBar>

      <Grid
        container
        alignItems="stretch"
        style={{
          minHeight: `calc(100vh - ${
            props.navHeight ? props.navHeight : 0
          }px - ${barHeight}px)`,
        }}
      >
        <Grid
          container
          item
          alignItems="flex-start"
          xs={12}
          md={4}
          style={{
            minHeight: `calc(100vh - ${
              props.navHeight ? props.navHeight : 0
            }px - ${barHeight}px)`,
          }}
        >
          <Question question={question} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          className={classes.codeContainer}
          style={{
            minHeight: `calc(100vh - ${
              props.navHeight ? props.navHeight : 0
            }px - ${barHeight}px)`,
          }}
        >
          <CodeEditor
            language={language}
            value={code}
            onChange={handleCodeChange}
          />
          <Console compileCode={compileCode} value={results} />
        </Grid>
      </Grid>
      <WaitingRoom
        id={interviewId}
        open={WaitingRoomOpen}
        setOpen={setWaitingRoomOpen}
      />
      <RoomBlockDialog open={roomBlockOpen} close={handleRoomBlockClose} />
    </React.Fragment>
  );
};

export default Interview;
