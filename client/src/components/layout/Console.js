import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";

import { Controlled as ControlledEditor } from "react-codemirror2";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#242C21",
    borderRadius: "15px 15px 0 0",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    margin: theme.spacing(2),
    border: 1,
  },
  btn: {
    borderRadius: "30px",
  },
  codeMirrorWrapper: {
    width: "100%",

    "& .CodeMirror": {
      boxSizing: "border-box",
      height: "130px",
      fontSize: 16,
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      borderRadius: "0 0 15px 15px",
      backgroundColor: "#3e4e57",
    },
  },
}));

const Console = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} borderRadius={16} border={1}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Console
          </Typography>
          <Button
            variant="outlined"
            className={classes.btn}
            color="inherit"
            onClick={props.compileCode}
          >
            Run
          </Button>
        </Toolbar>
      </AppBar>
      <ControlledEditor
        value={props.value}
        className={classes.codeMirrorWrapper}
        options={{
          lineWrapping: true,
          lint: true,
          theme: "material",
          tabSize: 2,
          fixedGutter: true,
          scrollbarStyle: "null",
        }}
      />
    </Box>
  );
};

export default Console;
