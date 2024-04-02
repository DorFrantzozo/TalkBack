import { getSocketIdByUser } from "../user/userHandler.js";
import serverSocket from "../ServerSockets.js";
import { Socket } from "socket.io";

const gameHandler = {
  handleChooseSquare(newBoard, opponent) {
    const opponentSocket = serverSocket.activeGamePlayers[opponent];
    console.log(opponent, opponentSocket);
    serverSocket.gameNamespace
      .to(opponentSocket)
      .emit("opponentTurn", newBoard);
  },
  handleEndGame(opponent) {
    const opponentSocket = serverSocket.activeGamePlayers[opponent];
    serverSocket.gameNamespace.to(opponentSocket).emit("endGame");
  },
  handleStartGame(opponent, gameId, self) {
    const opponentSocket = serverSocket.activeGamePlayers[opponent];
    serverSocket.gameNamespace
      .to(opponentSocket)
      .emit("init", gameId, serverSocket.activeGamePlayers[self]);
    console.log("Game Started...");
  },
};
export default gameHandler;