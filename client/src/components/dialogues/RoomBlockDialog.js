import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core/";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    display: "flex",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const history = useHistory();

  const toDashboard = () => {
    history.push({
      pathname: "/",
    });
    props.close();
  };

  const classes = useStyles();
  const open = props.open;

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar style={{ alignSelf: "center" }}>
          <Typography variant="h6" className={classes.title}>
            Room full!
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Sorry, this room is already full.</Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", marginBottom: "4rem" }}>
        <Button autoFocus onClick={toDashboard} variant="outlined">
          Back to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}
