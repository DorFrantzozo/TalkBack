import {
  getUserBySocketId,
  getUserByUserId,
  getSocketIdByUser,
} from "./userHandler.js";
import serverSocket from "../ServerSockets.js";
export default function chatHandler(socket) {
  // game invite
  const handleSendInvite = (user) => {
    const sender = getUserBySocketId(socket.id);
    socket.to(user.key).emit("receiveInvite", sender);
  };
  const handleAcceptInvite = (user) => {
    const key = getSocketIdByUser(user.id);
    const sender = getUserBySocketId(socket.id);
    socket.to(key).emit("inviteAccepted", sender);
  };
  socket.on("sendInvite", handleSendInvite);
  socket.on("AcceptInvite", handleAcceptInvite);
}
export const handleSendMessage = (message, user, senderid) => {
  const sender = getUserByUserId(senderid);
  serverSocket.userNamespace
    .to(user.key)
    .emit("receiveMessage", message, sender);
};
