import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

let newSocket;
const CONNECTION_PORT = "localhost:3001";

const SocketProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState(0);
  const [socket, setSocket] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const setupSocket = useCallback(() => {
    newSocket = io(CONNECTION_PORT, {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("socket connected!");
      newSocket.emit("username", user.email);
    });

    newSocket.on("connected", (user) => {
      setUsers((users) => [...users, user]);
      newSocket.on("users", (users) => {
        setUsers(users);
      });
    });

    newSocket.on("users", (users) => {
      setUsers(users);
    });

    newSocket.on("user count", (data) => {
      setCurrentUsers(data);
    });

    newSocket.on("disconnect", () => {
      setSocket(null);
      setTimeout(setupSocket, 3000);
      console.log("socket disconnected!");
    });

    newSocket.on("disconnected", (userId) => {
      setUsers((users) => {
        return users.filter((user) => user.id !== userId);
      });
    });

    setSocket(newSocket);
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && !socket) {
      setupSocket();
    }
  }, [isAuthenticated, setupSocket, socket]);

  return (
    <>
      {
        <SocketContext.Provider
          value={{ socket, currentUsers, setupSocket, users }}
        >
          {children}
        </SocketContext.Provider>
      }
    </>
  );
};

export default SocketProvider;
