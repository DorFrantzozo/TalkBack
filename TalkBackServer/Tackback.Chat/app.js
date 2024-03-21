import { Server } from "socket.io";
import express from "express";
const port = 3001;

const app = express();

const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
