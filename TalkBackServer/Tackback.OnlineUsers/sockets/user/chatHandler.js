export default function chatHandler(socket) {
  const sendMessage = (message) => {
    // When the client sends a message
    console.log("Message received:", message);
    // Broadcast the message to all connected clients
    socket.emit("receiveMessage", message);
  };
  socket.on("sendMessage", sendMessage);
  const readOrder = (orderId, callback) => {
    // ...
  };
}
