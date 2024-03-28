import registerUserHandler from "./userHandler.js";
import registerChatHandler from "./chatHandler.js";
import { io } from "../../app.js";

export default function userSocket() {
  const userNamespace = io.of("/user");
  userNamespace.on("connection", (socket) => {
    registerUserHandler(socket);
    registerChatHandler(socket);
  });
}
// Server-side
