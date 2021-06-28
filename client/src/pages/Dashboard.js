import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { theme } from "../themes/theme";
import Button from "@material-ui/core/Button";

import UpcomingInterviews from "../components/UpcomingInterviews";
import PastInterviews from "../components/PastInterviews";
import CreateInterview from "../components/dialogues/CreateInterview";
import WaitingRoom from "../components/dialogues/WaitingRoom";
import { UserContext } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnRoot: {
    borderRadius: "30px",
    padding: "1rem 3rem",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    upcomingInterviews,
    WaitingRoomOpen,
    setWaitingRoomOpen,
  } = useContext(UserContext);

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getFeedbacks = async () => {
      axios.defaults.withCredentials = true;
      const rev = await axios.get("api/feedback");
      console.log(rev);
      setReviews(rev.data);
    };

    getFeedbacks();
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={4} align="center">
          <Button
            autoFocus
            classes={{ root: classes.btnRoot }}
            onClick={() => setOpen(true)}
            size="large"
            variant="contained"
            color="primary"
          >
            Create Interview
          </Button>
        </Box>
        <Box pt={8}>
          <Typography
            style={{ color: theme.palette.primary.light }}
            variant="h4"
            align="center"
          >
            Upcoming practice interviews
          </Typography>
          <UpcomingInterviews rows={upcomingInterviews} />
        </Box>
        <Box pt={8} pb={12}>
          <Typography
            style={{ color: theme.palette.primary.light }}
            variant="h4"
            align="center"
          >
            Past practice interviews
          </Typography>
          <PastInterviews rows={reviews} />
        </Box>
      </Container>
      <CreateInterview open={open} setOpen={setOpen} />
      <WaitingRoom
        id={""}
        open={WaitingRoomOpen}
        setOpen={setWaitingRoomOpen}
      />
    </>
  );
};

export default Dashboard;
