import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography } from "@material-ui/core";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import gfm from "remark-gfm";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    [theme.breakpoints.down("md")]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    },
  },
  questionBody: {
    width: "100%",
    minHeight: "500px",
  },
  questionTitle: {
    color: theme.palette.primary.light,
  },
  markdownContainer: {
    "& p,& li": {
      fontFamily: ['"Open Sans"', "sans-serif"].join(","),
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 2,
      color: "#5E6676",
    },
  },
}));

const Question = ({ question }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Grid
      container
      className={classes.container}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Question" />
        <Tab label="Answer" />
      </Tabs>
      <Box mt={3}>
        <Typography variant="h4" className={classes.questionTitle}>
          {question.title}
        </Typography>
        <ReactMarkdown
          components={components}
          className={classes.markdownContainer}
          remarkPlugins={[gfm]}
        >
          {tab === 0 ? question.body : question.solution}
        </ReactMarkdown>
      </Box>
    </Grid>
  );
};

export default Question;
