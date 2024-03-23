import { Server } from "socket.io";
import express from "express";
const port = 3001;

const app = express();

const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow requests only from this origin
  },
});

const OnlineUsers = {};
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  OnlineUsers[socket.id] = socket.id;
  socket.emit("updateOnlineUsers", Object.values(OnlineUsers));
  socket.broadcast.emit("updateOnlineUsers", Object.values(OnlineUsers));

  // socket.on("login", (username) => {
  //   if (OnlineUsers[socket.id]) return;
  //   OnlineUsers[socket.id] = username;
  //   socket.broadcast.emit("user-connected", socket.id);
  //   console.log(username);
  // });

  socket.on("UpdateUsers", () => {
    OnlineUsers[socket.id] = name;
    socket.broadcast.emit("user-connected", OnlineUsers[socket.id]);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete OnlineUsers[socket.id];
    socket.broadcast.emit("updateOnlineUsers", Object.values(OnlineUsers));
  });
  // socket.on("stat-chat-message", (username) => {
  //   companion_id = Object.keys(OnlineUsers).find(
  //     (key) => object[key] === username
  //   );
  //   if (!companion_id) throw new Error("user not found");
  // });
});
