import React, { useState, useEffect, useContext } from "react";
import Board from "./Board";
import "./ticTacToe.css";
import { Box, Typography } from "@mui/material";
import gameManager, { gameSocket } from "../../services/gameService";

export default function Game() {
  const [opponent, setOpponent] = useState(gameManager.opponent);
  
  useEffect(() => {
    gameSocket.on("init", handleInit);
    return () => {
      gameSocket.off("init", handleInit);
    };
  }, []);

  const handleInit = async (gameId, opponent) => {
    console.log(gameId, opponent);
    gameManager.gameId = gameId;
    gameManager.opponent = opponent;
    setOpponent(opponent);
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {opponent && <Typography>Playing vs {opponent.name}</Typography>}
      </Box>
      <Box
        height={750}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        className="gameContainer"
      >
        <Board />
      </Box>
    </>
  );
}
