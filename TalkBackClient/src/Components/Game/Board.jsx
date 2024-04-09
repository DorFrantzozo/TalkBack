// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Square from "./Square";
import { useNavigate } from "react-router-dom";
import "./ticTacToe.css";
import gameManager, { gameSocket } from "../../services/gameService";
// eslint-disable-next-line react/prop-types
export default function Board() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(""));
  useEffect(() => {
    gameSocket.on("opponentTurn", handleOpponentTurn);
    gameSocket.on("endGame", handleEndGame);

    return () => {
      gameSocket.off("opponentTurn", handleOpponentTurn);
      gameSocket.off("endGame", handleEndGame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndGame = async (winner) => {
    gameSocket.emit("unMount");
    gameSocket.disconnect();
    console.log(winner);
    if (winner) {
      console.log(winner);
      if (winner === "draw") {
        console.log("draw");
        gameManager.handleAlert("draw");
      } else {
        gameManager.handleAlert("won");
      }
    } else {
      gameManager.handleAlert("lost");
    }
    gameManager.handleResetGame();
    navigate("/chat");
  };
  const handleOpponentTurn = async (newBoard) => {
    gameManager.board = newBoard;
    setBoard(gameManager.board);
    gameManager.playerTurn = true;
  };
  const handleChooseSquare = async (squareIndex) => {
    const winner = await gameManager.handleChooseSquare(squareIndex);
    setBoard(gameManager.board);
    console.log(gameManager.board);
    if (winner) {
      gameSocket.emit("unMount");
      gameSocket.disconnect();
      if (winner === "draw") {
        console.log("draw2");
        gameManager.handleAlert("draw");
      } else {
        gameManager.handleAlert("won");
      }
      navigate("/chat");
    }
  };

  return (
    <>
      <Box className="board">
        <div className="row">
          {[0, 1, 2].map((i) => (
            <Square
              key={i}
              choosSquare={() => handleChooseSquare(i)}
              value={board[i]}
            />
          ))}
        </div>
        <div className="row">
          {[3, 4, 5].map((i) => (
            <Square
              key={i}
              choosSquare={() => handleChooseSquare(i)}
              value={board[i]}
            />
          ))}
        </div>
        <div className="row">
          {[6, 7, 8].map((i) => (
            <Square
              key={i}
              choosSquare={() => handleChooseSquare(i)}
              value={board[i]}
            />
          ))}
        </div>
      </Box>
    </>
  );
}
