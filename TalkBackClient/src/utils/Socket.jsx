import { io } from "socket.io-client";
import { getUser } from "../services/authService";
export const socket = io("http://localhost:3001", {
  autoConnect: false,
});
export const SocketManager = {
  connect() {
    socket.connect();
    socket.on("connect", async () => {
      const user = await getUser();
      console.log(user);
      socket.emit("addUser", user);
    });
  },

  disconnect() {
    socket.disconnect();
  },
};
