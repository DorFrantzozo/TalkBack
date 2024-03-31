import * as React from "react";
import Stack from "@mui/material/Stack";
import { Avatar, Box, Paper, Typography } from "@mui/material";
// eslint-disable-next-line react/prop-types
export default function MyChat({ data }) {
  const { sender, message } = JSON.parse(data);
  console.log(name);
  return (
    <Stack spacing={3}>
      {/* For variant="text", adjust the height via font-size */}

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar src="/static/images/avatar/2.jpg" />

        <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {sender.name}
          </Typography>
          <Paper
            elevation={8}
            sx={{ backgroundColor: "#3DB250", borderRadius: 5, padding: 2 }}
          >
            <Typography variant="body1">{message}</Typography>
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
}
