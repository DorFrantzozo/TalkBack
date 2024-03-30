import { io } from "socket.io-client";
import { getUser } from "./authService";
import { toast } from "react-toastify";

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

  handleUpdateUsers(onlineusers) {
    console.log(onlineusers);

    if (onlineusers) {
      const filteredIds = Object.keys(onlineusers).filter(
        (id) => userSocket.id !== id
      );
      const filteredUsers = {};
      filteredIds.map((id, index) => {
        filteredUsers[index] = { id, name: onlineusers[id].name };

        console.log(index, filteredUsers[index]);
        alertLogIn(filteredUsers[index].name);
      });
      console.log(filteredUsers);
      return filteredUsers;
    }
  },
};
const alertLogIn = (name) => {
  toast.success(`${name} is online`, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
