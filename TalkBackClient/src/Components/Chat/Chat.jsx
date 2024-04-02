import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React, { useContext } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { useState, useEffect } from "react";
import { userSocket } from "../../services/userSocketService";
import CasinoIcon from "@mui/icons-material/Casino";
import GameInvite from "../Game/GameInvite";
import Divider from "@mui/material/Divider";
import { handleSendeMessage } from "../../services/chatService";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { gameSocket } from "../../services/gameService";
import { getUser } from "../../services/authService";

export default function Chat() {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [sender, setSender] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    // Listen for 'receiveMessage' event from the server
    userSocket.on("receiveMessage", handleReceiveMessage);

    // Clean up socket connection on component unmount
    return () => {
      userSocket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const handlesendMessage = async () => {
    if (messageInput.trim() !== "") {
      // Emit 'sendMessage' event to the server
      console.log("here");
      const messageStatus = await handleSendeMessage(
        messageInput,
        selectedUser
      );

      console.log(messageStatus);
      if (!messageStatus) {
        alert("message didnt Send");
        return;
      }
      setMessages((perv) => [
        ...perv,
        { isSelf: true, message: messageInput, sender: auth.user },
      ]);

      // userSocket.emit("sendMessage", messageInput, selectedUser);
      setMessageInput("");
    }
  };
  const handleReceiveMessage = (message, sender) => {
    console.log(message, sender);
    if (selectedUser !== sender.id) {
      setHasNewMessage(true);
    }
    setMessages((perv) => [...perv, { isSelf: false, message, sender }]);
  };

  const handleSelected = (selected) => {
    setShowTextField(true);
    const user = JSON.parse(selected);
    setSelectedUser(user);
  };

  const handleChatMessages = () => {
    if (Object.keys(selectedUser).length === 0) {
      return [];
    }
    const filtered = messages.filter(
      (message) => message.sender.id === selectedUser.user.id || message.isSelf
    );
    return filtered;
  };

  const handleInvite = () => {
    userSocket.emit("sendInvite", selectedUser);
  };

  const handleGameInvite = (sender) => {
    setSender(sender);
    setOpenModal(true);
  };
  const handleGameAccepted = async () => {
    gameSocket.connect();
    const self = await getUser();
    gameSocket.emit("mount", self.id);

    navigate("/game");
  };
  useEffect(() => {
    userSocket.on("receiveInvite", handleGameInvite);
    userSocket.on("inviteAccepted", handleGameAccepted);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
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
                {selectedUser && selectedUser.user
                  ? selectedUser.user.name
                  : ""}

                {selectedUser && selectedUser.user && (
                  <Button
                    endIcon={<CasinoIcon />}
                    onClick={handleInvite}
                    sx={{ marginLeft: "30px" }}
                  >
                    Play now
                  </Button>
                )}
              </Typography>
              <Box>
                {handleChatMessages().map((data, index) =>
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
        {openModal && (
          <GameInvite user={sender} open={openModal} setOpen={setOpenModal} />
        )}
        ;
      </ThemeProvider>
    </>
  );
}
