import Game from "../models/game.js";
import axios from "axios";
const Online_API_URL = "http://localhost:3001";
const service = axios.create({
  baseURL: Online_API_URL,
});

const activeGames = {};
const gameController = {
  async startGame_post(req, res) {
    try {
      const { opponent, self } = req.body;
      const gameId = `${req.userid}${opponent.id}`;
      await service.post("/sendOpponentGame", {
        opponent,
        gameId,
        self,
      });
      activeGames[gameId] = {
        game: new Game(),
        player1: req.userid,
        player2: opponent.id,
      };

      res.status(200).json({ gameId: gameId, message: "Success game started" });
    } catch (error) {
      res.status(401).json({ error: "player denied the game request" }); // Send error response to client
    }
  },
  async chooseSquare_post(req, res) {
    try {
      const { squareIndex, gameId } = req.body;
      if (!activeGames[gameId])
        res.status(400).json({ error: "gameId not found" }); // Send error response to client
      const player = activeGames[gameId].player1 === req.userid ? "X" : "O";
      console.log("player =" + player);
      const { winner, newBoard } = activeGames[gameId].game.handleChooseSquare(
        squareIndex,
        player
      );
      console.log(winner + " - winner");
      if (!newBoard) {
        res.status(200).json({ isValid, message: "Square not Valid" });
      }

      const response = await service.post("/chooseSquare", {
        newBoard,
        opponent:
          player === "X"
            ? activeGames[gameId].player2
            : activeGames[gameId].player1,
      });

      if (winner) {
        await service.post("/endGame", {
          winner,
          opponent:
            player === "X"
              ? activeGames[gameId].player2
              : activeGames[gameId].player1,
        });
        delete activeGames[gameId];
      }
      res.status(200).json({ newBoard, message: "choose Square Success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "choose Square server error" }); // Send error response to client
    }
  },
};
export default gameController;
