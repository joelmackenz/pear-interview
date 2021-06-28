import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Paper,
  FormControl,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import laptopPhoto from "../images/blue-shirt-at-laptop.png";

const useStyles = makeStyles({
  imageContainer: {
    width: "500px",
    height: "auto",
    overflow: "hidden",
  },
  laptopImage: {
    height: "auto",
    width: "100rem",
    transform: "scaleX(-1)",
    marginLeft: "-300px",
    marginTop: "-100px",
  },
  getStarted: {
    paddingTop: "10vw",
    paddingLeft: "10vw",
    display: "flex",
    flexDirection: "column",
  },
  signupForm: {
    display: "flex",
    flexDirection: "column",
    width: "20rem",
    maxWidth: "40vw",
  },
  formControl: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  toSignIn: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: "10px",
    marginRight: "1rem",
    "& Button": {
      marginLeft: "10px",
      padding: ".2rem",
      borderRadius: "50px",
      width: "100px",
      height: "25px",
    },
  },
  rightScreen: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
  },
  submitButton: {
    marginTop: "1rem",
    padding: ".5rem",
    borderRadius: "50px",
    width: "35%",
  },
});

export default function Signup() {
  const [inputFields, setInputFields] = useState([]);
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Below sets Errors to a boolean in order to set the error value in the TextField components
    if (!inputFields.firstName) {
      setErrors((errors) => ({
        ...errors,
        firstName: true,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        firstName: false,
      }));
    }

    if (!inputFields.lastName) {
      setErrors((errors) => ({
        ...errors,
        lastName: true,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        lastName: false,
      }));
    }

    if (inputFields.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setErrors((errors) => ({
        ...errors,
        email: false,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        email: true,
      }));
    }

    if (inputFields.password !== inputFields.confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        password: true,
        confirmPassword: true,
      }));
    } else {
      setErrors(
        (errors) => ({
          ...errors,
          password: false,
          confirmPassword: false,
          // The request will only be verified/sent after Confirm Password has been entered correctly.
        }),
        sendRequest(e)
      );
    }
  };

  const sendRequest = (e) => {
    e.preventDefault();
    let error = false;
    for (let i in errors) {
      if (errors[i] === true) {
        console.log("Not all fields filled in");
        error = true;
        return false;
      }
    }
    // Only sends if all errors are false
    if (!error) {
      axios
        .post("/api/signup", {
          firstName: inputFields.firstName,
          lastName: inputFields.lastName,
          email: inputFields.email,
          password: inputFields.password,
        })
        .then(() => {
          setRedirect(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (redirect) {
    return <Redirect to="/signin" />;
  }
  return (
    <Grid style={{ display: "flex", flexDirection: "row" }}>
      <Paper className={classes.imageContainer} variant="outlined">
        <img className={classes.laptopImage} src={laptopPhoto} alt="" />
      </Paper>
      <Grid className={classes.rightScreen}>
        <Grid className={classes.toSignIn}>
          <Typography>Already have an account?</Typography>
          <Link to="/signin">
            <Button variant="outlined">Sign In</Button>
          </Link>
        </Grid>
        <Grid className={classes.getStarted}>
          <Typography variant="h3" style={{ paddingBottom: "1rem" }}>
            Get started!
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.signupForm}
            noValidate
          >
            <FormControl className={classes.formControl}>
              <TextField
                required
                variant="outlined"
                id="firstName"
                name="firstName"
                label="First Name"
                error={errors.firstName}
                onChange={(e) => {
                  setInputFields((inputFields) => ({
                    ...inputFields,
                    firstName: e.target.value,
                  }));
                  if (!e.target.value) {
                    setErrors((errors) => ({
                      ...errors,
                      firstName: true,
                    }));
                  } else {
                    setErrors((errors) => ({
                      ...errors,
                      firstName: false,
                    }));
                  }
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                variant="outlined"
                id="lastName"
                name="lastName"
                label="Last Name"
                error={errors.lastName}
                onChange={(e) => {
                  setInputFields((inputFields) => ({
                    ...inputFields,
                    lastName: e.target.value,
                  }));
                  if (!e.target.value) {
                    setErrors((errors) => ({
                      ...errors,
                      lastName: true,
                    }));
                  } else {
                    setErrors((errors) => ({
                      ...errors,
                      lastName: false,
                    }));
                  }
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                variant="outlined"
                id="email"
                name="email"
                label="Email address"
                error={errors.email}
                inputProps={{ type: "email" }}
                onChange={(e) => {
                  setInputFields((inputFields) => ({
                    ...inputFields,
                    email: e.target.value,
                  }));
                  if (!e.target.value) {
                    setErrors((errors) => ({
                      ...errors,
                      email: true,
                    }));
                  } else {
                    setErrors((errors) => ({
                      ...errors,
                      email: false,
                    }));
                  }
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
                error={errors.password}
                inputProps={{ minLength: 6 }}
                onChange={(e) => {
                  setInputFields((inputFields) => ({
                    ...inputFields,
                    password: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                required
                variant="outlined"
                id="confirm-password"
                label="Confirm Password"
                type="password"
                error={errors.confirmPassword}
                onChange={(e) => {
                  setInputFields((inputFields) => ({
                    ...inputFields,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              id="form-submit"
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
