import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(75),
      height: theme.spacing(63),
    },
    margin: "5rem auto",
  },
  bgColor: {
    backgroundColor: theme.palette.primary.main,
  },
  mainContainer: {
    margin: "auto",
  },
}));

const ProfileAuthContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.bgColor}>
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        xs={11}
        md={8}
        className={classes.mainContainer}
      >
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Paper>{children}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileAuthContainer;
