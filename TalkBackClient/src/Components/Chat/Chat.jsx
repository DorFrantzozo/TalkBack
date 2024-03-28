import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { useState, useEffect } from "react";
import chatHandler from "../../../../TalkBackServer/Tackback.OnlineUsers/sockets/user/chatHandler";
import { userSocket } from "../../services/userSocketService";
export default function Chat() {
  const [selectedUser, setSelectedUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for 'receiveMessage' event from the server
    userSocket.on("receiveMessage", (message) => {
      setMessages((perv) => [...perv, message]);
    });

    // Clean up socket connection on component unmount
    return () => {
      userSocket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      // Emit 'sendMessage' event to the server
      userSocket.emit("sendMessage", messageInput);
      console.log(messageInput);
      setMessageInput("");
    }
  };

  const handleSelected = (selectedUser) => {
    const user = JSON.parse(selectedUser);
    setSelectedUser(user);
    console.log(user);
  };

  return (
    <>
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
              <Contacts handleSelected={handleSelected} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
              >
                {selectedUser ? selectedUser.name : ""}
              </Typography>
              <MyChat />
              <HisChat />
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  sx={{ flex: 1, mr: 1 }}
                  id="standard-basic "
                  label="Type your message here"
                  variant="standard"
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<SendIcon />}
                  onClick={sendMessage}
                  sx={{ height: "40px", color: "white" }}
                >
                  Send
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}
