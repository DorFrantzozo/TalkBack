import gameHandler from "../sockets/game/gameHandler.js";
import serverSocket from "../sockets/ServerSockets.js";
const gameController = {
  async sendOpponentGame_post(req, res) {
    try {
      const { gameId, opponent, self } = req.body;
      console.log("event");
      console.log(opponent);
      gameHandler.handleStartGame(opponent, gameId, self);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(403);
    }
  },
  async chooseSquare_post(req, res) {
    try {
      const { newBoard, opponent } = req.body;
      gameHandler.handleChooseSquare(newBoard, opponent);
      res.sendStatus(200);
    } catch (error) {
      // console.log("error" + error);
      res.sendStatus(403);
    }
  },
  async endGame_post(req, res) {
    try {
      const { winner, opponent } = req.body;
      gameHandler.handleEndGame(winner, opponent);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(403);
    }
  },
};
export default gameController;
