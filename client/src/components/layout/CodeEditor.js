import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";

import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";

import { Controlled as ControlledEditor } from "react-codemirror2";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  codeMirrorWrapper: {
    width: "100%",
    height: "calc(100% - 240px)",
    "& .CodeMirror": {
      boxSizing: "border-box",
      minHeight: "100%",
      fontSize: 16,
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(1),
    },
  },
}));

const CodeEditor = (props) => {
  const classes = useStyles();

  const { language, value, onChange } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <ControlledEditor
      onBeforeChange={handleChange}
      value={value}
      className={classes.codeMirrorWrapper}
      options={{
        lineWrapping: true,
        mode: language === "java" ? "text/x-java" : language,
        lineNumbers: true,
        theme: "material",
        tabSize: 2,
        indentWithTabs: true,

        fixedGutter: true,
        coverGutterNextToScrollbar: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        scrollbarStyle: "null",
        autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      }}
    />
  );
};

export default CodeEditor;
