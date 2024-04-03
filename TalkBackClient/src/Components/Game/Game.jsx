import React from "react";
import Board from "./Board";
import "./ticTacToe.css";
import { Box, Typography } from "@mui/material";
export default function Game() {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Typography>Playing vs</Typography>
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
