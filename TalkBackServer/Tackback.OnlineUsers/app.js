import { Server } from "socket.io";
import express from "express";
const port = 3001;

const app = express();
app.use(express.json());

const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3002"], // Allow requests only from this origin
  },
});

const OnlineUsers = {};
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  OnlineUsers[socket.id] = socket.id;
  socket.emit("updateOnlineUsers", Object.values(OnlineUsers));
  socket.broadcast.emit("updateOnlineUsers", Object.values(OnlineUsers));

  socket.on("UpdateUsers", () => {
    // OnlineUsers[socket.id] = name;
    socket.broadcast.emit("user-connected", OnlineUsers[socket.id]);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete OnlineUsers[socket.id];
    socket.broadcast.emit("updateOnlineUsers", Object.values(OnlineUsers));
  });
});
