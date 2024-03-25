import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { useState } from "react";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelecteUser = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, marginTop: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
            >
              Contacts
            </Typography>
            <Contacts selectedUser={handleSelecteUser} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h4"
              sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
            >
              {selectedUser}
            </Typography>
            <MyChat />
            <HisChat />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                sx={{ flex: 1, mr: 1 }}
                id="standard-basic"
                label="Type your message here"
                variant="standard"
              />
              <Button
                variant="contained"
                size="small"
                endIcon={<SendIcon />}
                sx={{ height: "40px", color: "white" }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
