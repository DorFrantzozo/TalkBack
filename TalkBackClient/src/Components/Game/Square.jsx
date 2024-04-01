import React from "react";
import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Square({ choosSquare, value }) {
  return (
    <Box className="square" onClick={choosSquare}>
      {value}
    </Box>
  );
}
