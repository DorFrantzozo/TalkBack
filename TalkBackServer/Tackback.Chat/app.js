import { Server } from "socket.io";
import express from "express";
const port = 3001;

const app = express();

const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const companion = {};

io.on("connection", (socket) => {
  socket.on("connect", (room) => {
    if (room === "") throw Error("connection error");
    else {
      socket.join(room);
    }
  });
  socket.on("send-chat-message", (message, room) => {
    if (room === "") throw Error("connection error");
    else {
      socket.to(room).emit("receive-chat-message", {
        message: message,
        name: users[socket.id],
      });
    }
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
