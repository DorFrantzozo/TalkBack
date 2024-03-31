import { getUserName } from "./userHandler.js";
export default function chatHandler(socket) {
  const sendMessage = (message, user) => {
    // When the client sends a message
    console.log("Message received:", message);
    // Broadcast the message to all connected clients
    const sender = getUserName(socket.id);
    console.log(user, sender);
    socket.to(user.key).emit("receiveMessage", message, sender);
  };
  socket.on("sendMessage", sendMessage);
}
