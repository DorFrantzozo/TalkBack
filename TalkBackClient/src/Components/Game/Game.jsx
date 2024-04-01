import React from "react";
import Board from "./Board";
import "./ticTacToe.css";
import { Box, Typography } from "@mui/material";
export default function Game() {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        className="gameContainer"
      >
        <Board />
      </Box>
    </>
  );
}
