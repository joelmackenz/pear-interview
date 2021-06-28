import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  FormControl,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import laptopPhoto from "../images/blue-shirt-at-laptop.png";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

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
  signIn: {
    paddingTop: "10vw",
    paddingLeft: "10vw",
    display: "flex",
    flexDirection: "column",
  },
  signinForm: {
    display: "flex",
    flexDirection: "column",
    width: "20rem",
    maxWidth: "40vw",
  },
  formControl: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  toSignUp: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: "10px",
    marginRight: "1rem",
    "& Button": {
      marginLeft: "10px",
      padding: ".1rem",
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
  guestBtn: {
    marginLeft: "10px",
    marginTop: "2rem",
    padding: ".1rem",
    borderRadius: "50px",
    width: "100px",
    height: "25px",
  },
});

export default function Signin(props) {
  const interviewId = props.location.state;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const classes = useStyles();

  const loginGuestUser = async (guestNumber) => {
    const guestUser = {
      firstName: "guest",
      lastName: guestNumber,
      email: `guest-${guestNumber}@gmail.com`,
      password: "123456",
    };

    let response;

    try {
      response = await axios.post("/api/signin", {
        email: guestUser.email,
        password: guestUser.password,
      });
    } catch (error) {
      await axios.post("/api/signup", guestUser);
      response = await axios.post("/api/signin", {
        email: guestUser.email,
        password: guestUser.password,
      });
    }

    setIsAuthenticated(true);
    setUser(response.data);
    if (interviewId) {
      history.push(`/interview/${interviewId}`);
    } else {
      setRedirect(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/signin",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data);
        if (interviewId) {
          history.push(`/interview/${interviewId}`);
        } else {
          setRedirect(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Grid style={{ display: "flex", flexDirection: "row" }}>
        <Paper className={classes.imageContainer} variant="outlined">
          <img className={classes.laptopImage} src={laptopPhoto} alt="" />
        </Paper>
        <Grid className={classes.rightScreen}>
          <Grid className={classes.toSignUp}>
            <Typography>Don't have an account?</Typography>
            <Link to="/signup">
              <Button variant="outlined">Sign Up</Button>
            </Link>
          </Grid>
          <Grid className={classes.signIn}>
            <Typography variant="h3" style={{ paddingBottom: "1rem" }}>
              Sign In
            </Typography>
            <form
              className={classes.signinForm}
              noValidate
              onSubmit={handleSubmit}
            >
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  id="outlined-email-input"
                  label="Email Address"
                  variant="outlined"
                  error={errors.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={errors.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!e.target.value) {
                      setErrors((errors) => ({
                        ...errors,
                        password: true,
                      }));
                    } else {
                      setErrors((errors) => ({
                        ...errors,
                        password: false,
                      }));
                    }
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
            <Button
              className={classes.guestBtn}
              variant="outlined"
              onClick={() => loginGuestUser("one")}
            >
              Guest 1
            </Button>
            <Button
              style={{ marginTop: "0.5rem" }}
              className={classes.guestBtn}
              variant="outlined"
              onClick={() => loginGuestUser("two")}
            >
              Guest 2
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
