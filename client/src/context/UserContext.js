import React, { useState, createContext, useEffect } from "react";
// import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [WaitingRoomOpen, setWaitingRoomOpen] = useState(false);
  const [interviewIsStarted, setInterviewIsStarted] = useState(false);
  const [newlyCreatedInterview, setNewlyCreatedInterview] = useState(null);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const getAllInterviews = async () => {
      const res = await fetch("/api/interview", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const interviewList = await res.json();
      setUpcomingInterviews(interviewList);
    };

    getAllInterviews();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        upcomingInterviews,
        setUpcomingInterviews,
        WaitingRoomOpen,
        setWaitingRoomOpen,
        newlyCreatedInterview,
        setNewlyCreatedInterview,
        interviewIsStarted,
        setInterviewIsStarted,
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
