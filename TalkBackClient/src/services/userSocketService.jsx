import { io } from "socket.io-client";
import { getUser } from "./authService";
import { toast } from "react-toastify";

// Client-side
export const userSocket = io("http://localhost:3001/user", {
  autoConnect: false,
});
export const userSocketManager = {
  connect() {
    if (!userSocket.connected) {
      userSocket.connect();
    }
    userSocket.on("connect", this.handleUserConnect);
  },

  disconnect() {
    userSocket.off("connect", this.handleUserConnect);
    userSocket.disconnect();
  },
  async handleUserConnect() {
    const user = await getUser();
    console.log(user);
    userSocket.emit("user:connect", user);
  },
  handleAlert(alert) {
    if (alert.isOnline)
      toast.success(`${alert.name} is online`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else
      toast.error(`${alert.name} got offline`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  },
  handleUpdateUsers(onlineusers) {
    if (onlineusers) {
      const filteredIds = Object.keys(onlineusers).filter(
        (id) => userSocket.id !== id
      );
      const filteredUsers = {};
      filteredIds.map((id) => {
        filteredUsers[id] = {
          id: onlineusers[id].id,
          name: onlineusers[id].name,
        };
      });
      console.log(filteredUsers);
      return filteredUsers;
    }
  },
};
