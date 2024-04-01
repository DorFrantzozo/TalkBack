import { getUserBySocketId, getUserByUserId } from "./userHandler.js";
import userSocket from "./userSocket.js";
export default function chatHandler(socket) {
  // game invite
  const sendInvite = (user) => {
    const sender = getUserBySocketId(socket.id);
    socket.to(user.key).emit("receiveInvite", sender);
    console.log("Invite from :", sender);
    console.log(socket.id, sender);
  };
  socket.on("sendInvite", sendInvite);
}
export const handleSendMessage = (message, user, senderid) => {
  console.log(senderid);

  const sender = getUserByUserId(senderid);
  console.log(sender);
  userSocket.userNamespace.to(user.key).emit("receiveMessage", message, sender);
  console.log("send");
};
