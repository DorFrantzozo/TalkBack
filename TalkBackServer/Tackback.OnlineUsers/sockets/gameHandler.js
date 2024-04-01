import { userSocket } from "../../../TalkBackClient/src/services/userSocketService.jsx";
import { getUserName } from "./user/userHandler.js";

export default function gameHandler(socket) {
  const handleChooseSquare = (squareIndex, player) => {
    console.log("handleChooseSquare: ", squareIndex, player);
    socket.to(player).emit("handleChooseSquare", squareIndex, player);
  };
  socket.on("selectSquere", handleChooseSquare);
  ///handle choose squre event

  const readOrder = (orderId, callback) => {
    // ...
  };
  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);
}
