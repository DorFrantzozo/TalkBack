import { Server } from "socket.io";
import express from "express";
import registerUserSocket from "./sockets/user/userSocket.js";
const port = 3001;

const app = express();
app.use(express.json());

const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3002"], // Allow requests only from this origin
  },
});

const onConnection = (socket) => {
  // registerUserHandler(io, socket);
};
io.on("connection", onConnection);
registerUserSocket();
