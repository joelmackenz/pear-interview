import React, { useState } from "react";
import ProfileAuthContainer from "../components/layout/ProfileAuthContainer";
import { Grid, Box, Typography, Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    marginTop: "4rem",
    margin: "auto",
  },
  cardHeaderText: {
    textAlign: "center",
    fontSize: "1.6rem",
    color: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectInput: {
    paddingLeft: "1.5rem",
    fontSize: "12px",
  },
  helperText: {
    marginLeft: "0.5rem",
    fontSize: 14,
    color: theme.palette.grey[700],
  },
  ratingTitle: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
  },
  ratingDescription: {
    marginLeft: "0.5rem",
    color: theme.palette.grey[500],
  },
  btn: {
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
  center: {
    margin: "auto",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const ratingLevels = [
    {
      value: 1,
      ratingTitle: "entry level",
      ratingDescription: "Never had job interviews",
    },
    {
      value: 2,
      ratingTitle: "beginner",
      ratingDescription: "Had a few job interviews, but need to practice",
    },
    {
      value: 3,
      ratingTitle: "intermediate",
      ratingDescription: "Had a few job interviews, but need more practice",
    },
    {
      value: 4,
      ratingTitle: "advanced",
      ratingDescription: "Had some job interviews, need a little practice",
    },
    {
      value: 5,
      ratingTitle: "expert",
      ratingDescription: "Had so many job interviews",
    },
  ];

  const [experienceLevel, setExperienceLevel] = useState("");
  const [rating, setRating] = useState(2);

  const handleRatingChange = (e, value) => {
    setRating(value);
  };

  const showRating = () => {
    return ratingLevels.map((ratingObj) => {
      if (ratingObj.value === rating) {
        return (
          <React.Fragment>
            <Grid container item>
              <Typography
                className={classes.ratingTitle}
                color="primary"
                variant="body1"
              >
                {ratingObj.ratingTitle.toUpperCase()}
              </Typography>
            </Grid>
            <Grid container item>
              <Typography className={classes.ratingDescription} variant="body2">
                {ratingObj.ratingDescription}
              </Typography>
            </Grid>
          </React.Fragment>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <ProfileAuthContainer>
      <Grid container direction="row" item xs={12} justify="center">
        <Grid container item direction="column" spacing={5}>
          <Grid
            container
            item
            xs={12}
            md={6}
            justify="center"
            alignItems="center"
            className={classes.cardHeader}
          >
            <Typography className={classes.cardHeaderText} variant="h5">
              Tell about your background
            </Typography>
          </Grid>
          <Grid container item spacing={1} direction="column">
            <Grid
              container
              item
              xs={12}
              md={6}
              justify="center"
              className={classes.center}
            >
              <Grid container item>
                <FormHelperText className={classes.helperText}>
                  Years of professional experience
                </FormHelperText>
              </Grid>
              <Grid container item justify="center">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    className={classes.selectInput}
                    id="demo-simple-select-outlined-label"
                  >
                    Select your experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    label="Select your experience"
                  >
                    <MenuItem value="Beginner">
                      Beginner with less than 1 year of work experience
                    </MenuItem>
                    <MenuItem value="Intermediate">
                      1-2 years of work experience
                    </MenuItem>
                    <MenuItem value="Expert">
                      2-3 years of work experience
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              spacing={2}
              className={classes.center}
            >
              <Grid container item>
                <Typography
                  style={{ marginLeft: 0 }}
                  className={classes.helperText}
                  align="left"
                  component="legend"
                >
                  What is your level at job interviews?
                </Typography>
              </Grid>
              <Grid container item className={classes.formMargin}>
                <Rating
                  name="simple-controlled"
                  precision={1}
                  defaultValue={2}
                  value={rating}
                  onChange={(e, value) => handleRatingChange(e, value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              spacing={1}
              className={classes.center}
            >
              {showRating()}
            </Grid>
          </Grid>
          <Box mt={6}>
            <Grid container item justify="center">
              <Button
                className={classes.btn}
                size="large"
                variant="contained"
                color="primary"
              >
                next step
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ProfileAuthContainer>
  );
};

export default Profile;
