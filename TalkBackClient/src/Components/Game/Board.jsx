// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Square from "./Square";

import "./ticTacToe.css";
import { userSocket } from "../../services/userSocketService";
export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board, player) => {
    // Define all possible winning combinations
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    // Check each winning combination
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true; // Player has won
      }
    }
    return false; // No winner yet
  };

  // Inside your Board component

  const handleChooseSquare = (squareIndex) => {
    if (!winner && board[squareIndex] === "") {
      const newBoard = [...board];
      newBoard[squareIndex] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
      userSocket.emit("handleChooseSquare", squareIndex, player);

      if (checkWinner(newBoard, player)) {
        setWinner(player);
        alert(`Game Over, ${player} won!`);
        setBoard(Array(9).fill(""));
        setWinner(null);
      } else if (!newBoard.includes("")) {
        alert("Draw!");
        setBoard(Array(9).fill(""));
        setWinner(null);
      }
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
