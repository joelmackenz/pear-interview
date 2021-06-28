import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import avatar from "../../assets/avatar.png";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";

const links = ["Dashboard", "FAQ", "Blog"];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    fontSize: "10px",
    minHeight: "11em",
    boxShadow: "0px 5px 20px 1px rgba(0,0,0,0.05)",
    fontFamily: ['"Open Sans"', "sans-serif"].join(","),
    fontWeight: "600",
    padding: "0 9em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "9px",
      padding: "0 5em",
    },
  },
  navbar__logo: {
    opacity: "0.3",
    fontSize: "2.6em",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  navbar__link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    fontWeight: "inherit",
    fontSize: "1.6em",
    lineHeight: "2.2em",
    marginLeft: "5em",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "4em",
    },

    "&:hover, &:focus, &-selected": {
      color: theme.palette.primary.light,
      outline: "none",
    },
  },
  user: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    marginLeft: "12em",
    cursor: "pointer",
    color: theme.palette.text.secondary,

    [theme.breakpoints.down("sm")]: {
      marginLeft: "5em",
    },

    "&:hover, &:focus": {
      color: theme.palette.primary.light,
    },
  },
  user__name: {
    fontWeight: "inherit",
    fontSize: "1.6em",
    lineHeight: "2.2em",
    marginLeft: "1.25em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  popover__link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    fontWeight: "inherit",
    fontSize: "1em",
    lineHeight: "2.2em",

    "&:hover, &:focus": {
      color: theme.palette.primary.light,
    },
  },
  sectionDesktop: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  sectionMobile: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
}));

const Navbar = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  let location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await fetch("/api/logout");
    setUser(null);
    setIsAuthenticated(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popover = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList autoFocusItem={open} id="menu-list-grow">
        {links.map((link) => (
          <MenuItem
            key={link}
            onClick={handleClose}
            className={classes.sectionMobile}
          >
            <Link
              to={`/${link.toLowerCase()}`}
              ml={4}
              className={`${
                location.pathname.includes(link.toLowerCase())
                  ? classes.navbar__link_selected
                  : ""
              }
                 ${classes.popover__link}`}
            >
              {link}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <Link to="/profile" className={classes.popover__link}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link onClick={logout} to="/" className={classes.popover__link}>
            Logout
          </Link>
        </MenuItem>
      </MenuList>
    </Popover>
  );

  const renderMenu = (
    <div className={classes.sectionDesktop}>
      {links.map((link) => (
        <Link
          key={link}
          to={`/${link.toLowerCase()}`}
          className={`${classes.navbar__link} ${
            location.pathname.includes(link.toLowerCase())
              ? `${classes.navbar__link}-selected`
              : ""
          }`}
        >
          {link}
        </Link>
      ))}
      <Grid
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.user}
      >
        <Avatar className={classes.user__img} alt="avatar" src={avatar} />
        <Typography className={classes.user__name}>
          {user ? user.firstName : ""} {user ? user.lastName : ""}
        </Typography>
      </Grid>
      {popover}
    </div>
  );

  const renderMobileMenu = (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      {popover}
    </div>
  );

  return (
    <div className={classes.root} ref={ref}>
      <AppBar position="static" color="transparent">
        <Toolbar className={classes.navbar}>
          <Typography edge="start" className={classes.navbar__logo}>
            Logo
          </Typography>
          {renderMobileMenu}
          {renderMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Navbar;
