const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const socket = require("socket.io");
const io = socket({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  try {
    const token = cookie.parse(socket.handshake.headers.cookie).token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.user;
    next();
  } catch (error) {}
});

var socketApi = {};

socketApi.io = io;

const users = {};
let currentUsers = 0;

io.on("connection", (socket) => {
  console.log("username:", socket.userId); // username is id
  console.log("A user connected with socket id: ", socket.id);
  ++currentUsers;

  socket.on("joinInterviewRoom", ({ interviewId }) => {
    socket.join(interviewId);
    console.log(
      `user with socket id of ${socket.id} joined interview room: ${interviewId}`
    );
    socket.on("code", (code) => {
      socket.broadcast.to(interviewId).emit("code", code);
    });
    socket.on("compile", (result) => {
      socket.broadcast.to(interviewId).emit("compile", result);
    });
    socket.on("language", (language) => {
      socket.broadcast.to(interviewId).emit("language", language);
    });
  });

  socket.on("joinWaitingRoom", ({ interviewId }) => {
    socket.join(interviewId);
    io.emit("joinWaitingRoom");
    console.log(
      `user with socket id of ${socket.id} joined waiting room for interview ${interviewId}`
    );
  });

  socket.on("startInterview", ({ interviewId }) => {
    io.emit("startInterview");
    console.log(
      `user with socket id of ${socket.id} joined the waiting room for interview ${interviewId}`
    );
  });

  socket.on("leaveInterviewRoom", ({ interviewId }) => {
    socket.leave(interviewId);
    console.log(
      `A user with socket id of ${socket.id} left interview room: ${interviewId}`
    );
  });

  socket.on("leaveWaitingRoom", ({ interviewId }) => {
    socket.leave(interviewId);
    console.log(
      `A user with socket id of ${socket.id} left waiting room: ${interviewId}`
    );
  });

  socket.on("username", (userEmail) => {
    console.log("username in username event emit :", userEmail);
    users[socket.id] = { email: userEmail };
    io.emit("connected", userEmail);
    io.emit("users", Object.values(users));
  });

  io.emit("user count", currentUsers);

  socket.on("disconnect", (reason) => {
    --currentUsers;
    console.log("users on disconnect before delete:", users);
    delete users[socket.id];
    io.emit("disconnected", socket.id);
    io.emit("user count", currentUsers);
    console.log(`user with socket id of ${socket.id} disconnected.`);
  });
});

module.exports = socketApi;
