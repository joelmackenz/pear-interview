import React, { useContext } from "react";
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
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btn: {
    marginLeft: theme.spacing(1),
    borderRadius: "30px",
  },
  link: {
    "&:link, &:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

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

export default function UpcomingInterviews({ rows }) {
  const classes = useStyles();

  const { setDifficulty } = useContext(UserContext);

  const newRows = rows.map((row) => ({
    ...row,
    live: true,
    date: new Date(moment(row.date).format("MMMM DD, YYYY hh:mm:ss")),
  }));

  const formatDate = (date) => {
    return `${days[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}`;
  };

  const formatHour = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 12 ? hours : hours - 12}:${minutes}${
      minutes < 10 ? 0 : ""
    } ${hours < 13 ? "AM" : "PM"}`;
  };

  return (
    <React.Fragment>
      {!newRows || newRows.length === 0 ? (
        <Typography component="div" variant="h6">
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="text.disabled"
          >
            There are no upcoming interviews.
          </Box>
        </Typography>
      ) : (
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ width: "25%" }}>
                    When
                  </StyledTableCell>
                  <StyledTableCell>Interview Theme</StyledTableCell>
                  <StyledTableCell style={{ width: "40%" }}>
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newRows.map((row) => (
                  <TableRow key={row._id}>
                    <StyledTableCell>
                      <Typography>{formatDate(row.date)}</Typography>
                      <Typography>{formatHour(row.date)}</Typography>
                    </StyledTableCell>
                    {/* <StyledTableCell>{row.theme}</StyledTableCell> */}
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right">
                      {row.live && (
                        <Link
                          className={classes.link}
                          to={`interview/${row._id}`}
                        >
                          <Button
                            variant="outlined"
                            className={classes.btn}
                            onClick={() => setDifficulty(row.difficulty)}
                          >
                            Go to interview
                          </Button>
                        </Link>
                      )}
                      <Button variant="outlined" className={classes.btn}>
                        CANCEL
                      </Button>
                      <Button variant="outlined" className={classes.btn}>
                        RESCHEDULE
                      </Button>
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
