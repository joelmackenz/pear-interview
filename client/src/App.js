import React, { useState, useEffect, useRef, useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Interview from "./pages/Interview";
import Navbar from "./components/layout/Navbar";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Home from "./pages/HomePage";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import "./App.css";
import { UserContext } from "./context/UserContext";

function App() {
  const [navbarHeight, setHeightnavbarHieght] = useState(0);
  const ref = useRef();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    ref.current && setHeightnavbarHieght(ref.current.clientHeight);
    console.log(ref.current);
  }, [ref, ref.current]);

  useEffect(() => {
    axios
      .get("/api/JWT")
      .then((req) => {
        setIsAuthenticated(true);
        setUser(req.data);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  }, [setIsAuthenticated]);

  return !isAuthenticated ? (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <Route exact path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route
            path="/interview/:id"
            render={(props) => (
              <Interview {...props} navHeight={navbarHeight} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  ) : (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar ref={ref} />
        <Switch>
          <Route exact path="/signin">
            <Redirect to="/" />
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/dashboard" component={Dashboard} />
          <Route
            path="/interview/:id"
            render={(props) => (
              <Interview {...props} navHeight={navbarHeight} />
            )}
          />
          <Route path="/faq" component={FAQ} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
