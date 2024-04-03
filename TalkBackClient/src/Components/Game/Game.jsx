import React from "react";
import Board from "./Board";
import "./ticTacToe.css";
import { Box, Typography } from "@mui/material";
import gameManager from "../../services/gameService";

export default function Game() {
  const opponent = gameManager.opponent.name;
  console.log(opponent);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography>Playing vs {opponent}</Typography>
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
