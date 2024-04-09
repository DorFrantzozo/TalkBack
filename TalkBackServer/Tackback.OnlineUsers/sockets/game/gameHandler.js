import { getSocketIdByUser } from "../user/userHandler.js";
import serverSocket from "../ServerSockets.js";
import { Socket } from "socket.io";
const findActivePlayer = (id) => {
  const key = Object.keys(serverSocket.activeGamePlayers).find(
    (key) => serverSocket.activeGamePlayers[key].id === id
  );
  return key;
};
const gameHandler = {
  eventsRegister(socket) {
    const handleMount = (user, opponent) => {
      serverSocket.activeGamePlayers[user] = { id: socket.id, opponent };
      console.log(
        `Active Game User ${user}: ${serverSocket.activeGamePlayers[user].id}`
      );
    };
    const handleUnMount = () => {
      const key = findActivePlayer(socket.id);
      delete serverSocket.activeGamePlayers[key];
    };
    const handleDisconnect = () => {
      const key = findActivePlayer(socket.id);
      if (key) {
        console.log("disconnected:unMount");
        const opponentKey = serverSocket.activeGamePlayers[key].opponent.id;
        const user = serverSocket.activeGamePlayers[opponentKey].id;
        if (serverSocket.activeGamePlayers[opponentKey]) {
          const winner = true;
          serverSocket.gameNamespace.to(user).emit("endGame", winner);
        }
        delete serverSocket.activeGamePlayers[key];
      }
      console.log(`Deactivate Game User ${key}: ${socket.id}`);
    };
    socket.on("mount", handleMount);
    socket.on("unMount", handleUnMount);
    socket.on("disconnect", handleDisconnect);
  },
  handleChooseSquare(newBoard, opponent) {
    const opponentSocket = serverSocket.activeGamePlayers[opponent].id;
    serverSocket.gameNamespace
      .to(opponentSocket)
      .emit("opponentTurn", newBoard);
  },
  handleEndGame(winner, opponent) {
    const opponentSocket = serverSocket.activeGamePlayers[opponent].id;
    const state = winner === "draw" ? "draw" : false;
    serverSocket.gameNamespace.to(opponentSocket).emit("endGame", state);
  },
  handleStartGame(opponent, gameId, self) {
    console.log("opponent");
    console.log(serverSocket.activeGamePlayers);

    console.log(serverSocket.activeGamePlayers[opponent.id]);
    const opponentSocket = serverSocket.activeGamePlayers[opponent.id].id;
    serverSocket.gameNamespace.to(opponentSocket).emit("init", gameId, self);
    console.log("Game Started...");
  },
};
export default gameHandler;
