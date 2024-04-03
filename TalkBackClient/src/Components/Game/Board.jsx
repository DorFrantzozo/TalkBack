// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Square from "./Square";
import { useNavigate } from "react-router-dom";
import "./ticTacToe.css";
import gameManager, { gameSocket } from "../../services/gameService";
import { Typography } from "@mui/material";
// eslint-disable-next-line react/prop-types
export default function Board() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(""));
  // const [player, setPlayer] = useState("X");
  useEffect(() => {
    // gameSocket.on("init", handleInit);
    gameSocket.on("opponentTurn", handleOpponentTurn);
    gameSocket.on("endGame", handleEndGame);

    return () => {
      // gameSocket.off("init", handleInit);
      gameSocket.off("opponentTurn", handleOpponentTurn);
      gameSocket.off("endGame", handleEndGame);
    };
  }, []);

  const handleEndGame = async (winner) => {
    gameSocket.disconnect();
    if (winner === "draw") {
      alert("you draw");
    } else {
      alert("you Lost");
    }
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
      gameSocket.disconnect();
      if (winner === "draw") {
        alert("you draw");
      } else {
        alert("you won");
      }
      navigate("/chat");
    }
  };
  // const handleInit = async (gameId, oponnent) => {
  //   console.log(oponnent);
  //   gameManager.gameId = gameId;
  //   gameManager.opponent = oponnent;
  //   console.log(oponnent);
  //   // setPlayer("O");
  // };
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
