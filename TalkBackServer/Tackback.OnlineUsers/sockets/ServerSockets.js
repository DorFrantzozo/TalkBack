import registerUserHandler from "./user/userHandler.js";
import registerChatHandler from "./user/chatHandler.js";
import GameHandler from "./game/gameHandler.js";
import { Server } from "socket.io";

// import { io } from "../../app.js";

// export default function userSocket() {
//   const userNamespace = io.of("/user");
//   userNamespace.on("connection", (socket) => {
//     registerUserHandler(socket);
//     registerChatHandler(socket);
//   });
// }

const serverSocket = {
  userNamespace: null,
  gameNamespace: null,
  activeGamePlayers: {},

  io: null, // Add io property to store Socket.io instance

  initialize(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173"], // Allow requests only from this origin
      },
    });
    this.userNamespace = this.io.of("/user");
    this.userNamespace.on("connection", (socket) => {
      registerUserHandler(socket);
      registerChatHandler(socket);
    });
    console.log("initialize User Socket");
    this.gameNamespace = this.io.of("/game");
    this.gameNamespace.on("connection", (socket) => {
      const handleMount = (user) => {
        this.activeGamePlayers[user.id] = socket.id;
        console.log(`Active Game User ${user.id}: ${socket.id}`);
      };
      const handleUnMount = () => {
        const key = Object.keys(this.activeGamePlayers).find(
          (key) => this.activeGamePlayers[key] === socket.id
        );
        console.log(`Deactivate Game User ${key}: ${socket.id}`);
        delete this.activeGamePlayers[key];
      };
      socket.on("mount", handleMount);
      socket.on("disconnect", handleUnMount);
    });
    console.log("initialize Game Socket");
  },
};
export default serverSocket;
// Server-side
