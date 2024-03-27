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
const userVerification = (id) => {
  return Object.values(OnlineUsers).some((user) => {
    if (user.id === id) {
      return true;
    }
    return false;
  });
};

io.on("connection", (socket) => {
  socket.on("addUser", ({ name, id }) => {
    if (userVerification(id)) {
      return socket.disconnect();
    }
    console.log("A user connected:", name);
    OnlineUsers[socket.id] = { name: name, id: id };
    socket.emit("updateOnlineUsers", OnlineUsers);
    socket.broadcast.emit("updateOnlineUsers", OnlineUsers);
  });
  socket.on("disconnect", () => {
    if (OnlineUsers[socket.id]) {
      console.log("A user disconnected:", OnlineUsers[socket.id].name);
      socket.broadcast.emit("removeUser");
      delete OnlineUsers[socket.id];
      socket.broadcast.emit("updateOnlineUsers", OnlineUsers);
    }
  });
});
