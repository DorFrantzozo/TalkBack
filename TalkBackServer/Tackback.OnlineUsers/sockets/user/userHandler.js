const OnlineUsers = {};
export const getUserBySocketId = (id) => {
  if (OnlineUsers[id]) return OnlineUsers[id];
  return null;
};
export const getUserByUserId = (id) => {
  const userSocketit = Object.keys(OnlineUsers).find(
    (key) => OnlineUsers[key].id === id
  );
  return OnlineUsers[userSocketit];
};

const userVerification = (id) => {
  return Object.values(OnlineUsers).some((user) => user.id === id);
};
export default function chatHandler(socket) {
  const connectUser = (payload) => {
    const { name, id } = payload;
    if (userVerification(id)) {
      console.log(id, OnlineUsers);
      socket.disconnect();
      console.log(`User ${name} attempted to open multiple connections.`);
      return;
    }
    console.log("A user connected:", name);
    OnlineUsers[socket.id] = { name: name, id: id };
    socket.emit("updateOnlineUsers", OnlineUsers);
    const alert = {
      name,
      isOnline: true,
    };
    socket.broadcast.emit("updateOnlineUsers", OnlineUsers, alert);
  };

  const disconnectUser = () => {
    if (OnlineUsers[socket.id]) {
      const name = OnlineUsers[socket.id].name;
      console.log("A user disconnected:", name);
      delete OnlineUsers[socket.id];
      socket.broadcast.emit("updateOnlineUsers", OnlineUsers, {
        name,
        isOnline: false,
      });
      socket.disconnect(true);
    }
  };
  socket.on("user:connect", connectUser);
  socket.on("disconnect", disconnectUser);
}
