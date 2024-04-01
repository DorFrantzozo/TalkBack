import registerUserHandler from "./userHandler.js";
import registerChatHandler from "./chatHandler.js";
import { Server } from "socket.io";

// import { io } from "../../app.js";

// export default function userSocket() {
//   const userNamespace = io.of("/user");
//   userNamespace.on("connection", (socket) => {
//     registerUserHandler(socket);
//     registerChatHandler(socket);
//   });
// }

const userSocket = {
  userNamespace: null,
  initialize(httpServer) {
    console.log("initialize");
    const io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173"], // Allow requests only from this origin
      },
    });
    this.userNamespace = io.of("/user");
    this.userNamespace.on("connection", (socket) => {
      registerUserHandler(socket);
      registerChatHandler(socket);
    });
  },
};
export default userSocket;
// Server-side
