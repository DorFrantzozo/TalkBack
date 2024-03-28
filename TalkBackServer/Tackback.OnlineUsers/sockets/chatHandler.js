export default function chatHandler(io, socket) {
    const createOrder = (payload) => {
      // ...
    };
  
    const readOrder = (orderId, callback) => {
      // ...
    };
    socket.on("chat:user-connect", createOrder);
    socket.on("order:read", readOrder);
  }
  