import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";

import FeedbackHistoryDialog from "./dialogues/FeedbackHistoryDialog";
import QuestionDialog from "./dialogues/QuestionsHistoryDialog";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btn: {
    marginLeft: theme.spacing(1),
    borderRadius: "30px",
  },
}));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
  },
}))(TableCell);

export default function PastInterviews({ rows }) {
  const classes = useStyles();

  const [feedbackHistories, setFeedbackHistories] = useState({});

  const [questionHistories, setQuestionHistories] = useState({});

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${days[newDate.getDay()]}, ${
      months[newDate.getMonth()]
    } ${newDate.getDate()} ${newDate.getFullYear()}`;
  };

  const formatHour = (date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `${hours < 12 ? hours : hours - 12}:${minutes}${
      minutes < 10 ? 0 : ""
    } ${hours < 13 ? "AM" : "PM"}`;
  };

  const handleFeedbackOpenClose = (id) => {
    setFeedbackHistories((prevState) => ({
      ...prevState,
      [id]: {
        open: !prevState[id].open,
      },
    }));
  };

  const handleSetFeedbackHistory = (id) => {
    setFeedbackHistories((prevState) => ({
      ...prevState,
      [id]: {
        open: false,
      },
    }));
  };

  const handleQuestionOpenClose = (id) => {
    setQuestionHistories((prevState) => ({
      ...prevState,
      [id]: {
        open: !prevState[id].open,
      },
    }));
  };

  const handleSetQuestionHistory = (id) => {
    setQuestionHistories((prevState) => ({
      ...prevState,
      [id]: {
        open: false,
      },
    }));
  };

  return (
    <React.Fragment>
      {!rows || rows.length === 0 ? (
        <Typography component="div" variant="h6">
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="text.disabled"
          >
            There are no past interviews.
          </Box>
        </Typography>
      ) : (
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Held on</StyledTableCell>
                  <StyledTableCell align="center">Coding</StyledTableCell>
                  <StyledTableCell align="center">
                    Communication
                  </StyledTableCell>
                  <StyledTableCell align="center">Questions</StyledTableCell>
                  <StyledTableCell align="center">
                    Detailed Feedback
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <StyledTableCell>
                      <Typography>{formatDate(row.date)}</Typography>
                      <Typography>{formatHour(row.date)}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Rating name="read-only" value={row.code} readOnly />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Rating
                        name="read-only"
                        value={row.communication}
                        readOnly
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        className={classes.btn}
                        onClick={() => handleQuestionOpenClose(row.id)}
                      >
                        View
                      </Button>
                      <QuestionDialog
                        setDialog={handleSetQuestionHistory}
                        id={row.id}
                        date={formatDate(row.date)}
                        open={
                          questionHistories[row.id] === undefined
                            ? false
                            : questionHistories[row.id].open
                        }
                        openSibling={() => {
                          handleQuestionOpenClose(row.id);
                          handleFeedbackOpenClose(row.id);
                        }}
                        handleClose={() => handleQuestionOpenClose(row.id)}
                        question={row.questions[0]}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        className={classes.btn}
                        onClick={() => handleFeedbackOpenClose(row.id)}
                      >
                        View
                      </Button>
                      <FeedbackHistoryDialog
                        setDialog={handleSetFeedbackHistory}
                        id={row.id}
                        date={formatDate(row.date)}
                        open={
                          feedbackHistories[row.id] === undefined
                            ? false
                            : feedbackHistories[row.id].open
                        }
                        openSibling={() => {
                          handleFeedbackOpenClose(row.id);
                          handleQuestionOpenClose(row.id);
                        }}
                        handleClose={() => handleFeedbackOpenClose(row.id)}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </React.Fragment>
  );
}
