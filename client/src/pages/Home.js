import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { currentUsers, setupSocket } = useContext(SocketContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const login = async () => {
    await setIsAuthenticated(true);
    setupSocket();
  };

  return (
    <div>
      <button onClick={login}>login</button>
      {!isAuthenticated ? (
        <h1>To connect to the socket, please log in</h1>
      ) : (
        <h1>number of users which are currently connected: {currentUsers}</h1>
      )}
    </div>
  );
}

export default Home;
