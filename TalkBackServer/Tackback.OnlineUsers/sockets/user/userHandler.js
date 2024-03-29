const OnlineUsers = {};
export const getUserName = (id) => {
  if (OnlineUsers[id]) return OnlineUsers[id];
  return null;
};
export default function chatHandler(socket) {
  const userVerification = (id) => {
    return Object.values(OnlineUsers).some((user) => user.id === id);
  };
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
      delete OnlineUsers[socket.id];
      socket.broadcast.emit("removeUser");
      socket.broadcast.emit("updateOnlineUsers", OnlineUsers);
    }
  };

  socket.on("user:connect", connectUser);
  socket.on("disconnect", disconnectUser);
}
