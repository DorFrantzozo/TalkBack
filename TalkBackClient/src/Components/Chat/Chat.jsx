import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { useState, useEffect, useContext } from "react";
import { userSocket } from "../../services/userSocketService";
import { AuthContext } from "../../context/authContext";
import CasinoIcon from "@mui/icons-material/Casino";
import AlertNewUser from "./designCOmponent/AlertNewUser";
import { toast } from "react-toastify";
import Divider from "@mui/material/Divider";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTextField, setShowTextField] = useState(false);

  const auth = useContext(AuthContext);
  useEffect(() => {
    // Listen for 'receiveMessage' event from the server
    userSocket.on("receiveMessage", handleReceiveMessage);

    // Clean up socket connection on component unmount
    return () => {
      userSocket.off("receiveMessage");
    };
  }, []);

  const handlesendMessage = () => {
    if (messageInput.trim() !== "") {
      // Emit 'sendMessage' event to the server

      setMessages((perv) => [
        ...perv,
        { isSelf: true, message: messageInput, name: auth.name },
      ]);
      userSocket.emit("sendMessage", messageInput, selectedUser);
      console.log(messageInput);
      setMessageInput("");
      // Your submit logic here
    }
  };
  const handleReceiveMessage = (message, name) => {
    console.log(message, name);
    setMessages((perv) => [...perv, { isSelf: false, message, name }]);
  };

  const handleSelected = (selectedUser) => {
    setShowTextField(true);
    const user = JSON.parse(selectedUser);
    setSelectedUser(user);
    console.log(user);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AlertNewUser />
        <Box sx={{ flexGrow: 1, marginTop: "40px", padding: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
              >
                Contacts
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Contacts handleSelected={handleSelected} />
                <Divider
                  orientation="vertical"
                  variant="fullWidth"
                  flexItem
                  sx={{
                    height: "1000px",
                    color: "black",
                    display: { xs: "none", md: "block" },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Typography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
              >
                {selectedUser ? selectedUser.name : ""}
              </Typography>
              <Box>
                {Object.values(messages).map((data, index) =>
                  data.isSelf ? (
                    <MyChat key={index} data={JSON.stringify(data)} />
                  ) : (
                    <HisChat key={index} data={JSON.stringify(data)} />
                  )
                )}
              </Box>
              {showTextField && (
                <Box
                  height={700}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <TextField
                    sx={{ flex: 1, mr: 1 }}
                    id="standard-basic"
                    label="Type your message here"
                    variant="standard"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<SendIcon />}
                    onClick={handlesendMessage}
                    sx={{ height: "40px", color: "white" }}
                  >
                    Send
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}
