import { io } from "socket.io-client";
import { getUser } from "./authService";

// Client-side
export const userSocket = io("http://localhost:3001/user", {
  autoConnect: false,
});
export const userSocketManager = {
  connect() {
    userSocket.connect();
    userSocket.on("connect", async () => {
      const user = await getUser();
      console.log(user);
      userSocket.emit("user:connect", user);
    });
  },

  disconnect() {
    userSocket.off("user:connect");
    userSocket.disconnect();
  },
};
