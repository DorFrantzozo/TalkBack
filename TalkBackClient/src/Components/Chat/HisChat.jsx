/* eslint-disable react/prop-types */
import * as React from "react";
import Stack from "@mui/material/Stack";
import { Avatar, Box, Paper, Typography } from "@mui/material";

export default function HisChat({ data }) {
  const { name, message } = JSON.parse(data);
  return (
    <Stack spacing={3}>
      {/* For variant="text", adjust the height via font-size */}

      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Avatar src="/static/images/avatar/2.jpg" />

        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <Paper
            elevation={8}
            sx={{ backgroundColor: "#E0E0E0", borderRadius: 5, padding: 2 }}
          >
            <Typography variant="body1">{message}</Typography>
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
}
