const userVerification = (id) => {
  return Object.values(OnlineUsers).some((user) => {
    if (user.id === id) {
      return true;
    }
    return false;
  });
};
const OnlineUsers = {};
export const getUserName = (id) => {
  if (OnlineUsers[id]) return OnlineUsers[id];
  return null;
};
export default function chatHandler(socket) {
  const connectUser = (payload) => {
    const { name, id } = payload;
    if (userVerification(id)) {
      return socket.disconnect();
    }
    console.log("A user connected:", name);
    OnlineUsers[socket.id] = { name: name, id: id };
    socket.emit("updateOnlineUsers", OnlineUsers);
    socket.broadcast.emit("updateOnlineUsers", OnlineUsers);
  };

  const disconnectUser = () => {
    if (OnlineUsers[socket.id]) {
      console.log("A user disconnected:", OnlineUsers[socket.id].name);
      socket.broadcast.emit("removeUser");
      delete OnlineUsers[socket.id];
      socket.broadcast.emit("updateOnlineUsers", OnlineUsers);
    }
  };

  const selectUserToChat = (user) => {};
  socket.on("user:connect", connectUser);
  socket.on("disconnect", disconnectUser);
}
