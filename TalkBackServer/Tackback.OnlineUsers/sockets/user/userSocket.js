import registerUserHandler from "./userHandler.js";
import { io } from "../../app.js";

export default function userSocket() {
  const userNamespace = io.of("/user");
  userNamespace.on("connection", (socket) => {
    registerUserHandler(socket);
  });
}
// Server-side
