import React from "react";
import Board from "./Board";
import { Typography, Box } from "@mui/material";
export default function GamePage() {
  return (
    <>
      <Typography
        sx={{ display: "flex", justifyContent: "center", mt: "20px" }}
      >
        Playing VS ...
      </Typography>
      <Box height={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Board />
      </Box>
    </>
  );
}
