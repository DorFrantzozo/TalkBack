import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { useState, useEffect, useRef } from "react";
import { userSocket } from "../../services/userSocketService";
import CasinoIcon from "@mui/icons-material/Casino";
import GameInvite from "../Game/GameInvite";
import Divider from "@mui/material/Divider";
import {
  handleSendeMessage,
  handleAlertNewMessage,
} from "../../services/chatService";
import { useNavigate } from "react-router-dom";
import { gameSocket } from "../../services/gameService";
import { getUser } from "../../services/authService";

export default function Chat() {
  const selectedUser = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [sender, setSender] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // const auth = useContext(AuthContext);
  useEffect(() => {
    // Listen for 'receiveMessage' event from the server
    userSocket.on("receiveMessage", handleReceiveMessage);
    userSocket.on("receiveInvite", handleGameInvite);
    userSocket.on("inviteAccepted", handleGameAccepted);
    console.log("mount");
    // Clean up socket connection on component unmount
    return () => {
      userSocket.off("receiveMessage", handleReceiveMessage);
      userSocket.off("receiveInvite", handleGameInvite);
      userSocket.off("inviteAccepted", handleGameAccepted);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  const handlesendMessage = async () => {
    if (messageInput.trim() !== "") {
      // Emit 'sendMessage' event to the server
      console.log("here");
      const messageStatus = await handleSendeMessage(
        messageInput,
        selectedUser.current
      );

      console.log(messageStatus);
      if (!messageStatus) {
        alert("message didnt Send");
        return;
      }
      setMessages((perv) => [
        ...perv,
        {
          isSelf: true,
          message: messageInput,
          sender: selectedUser.current.user,
        },
      ]);

      // userSocket.emit("sendMessage", messageInput, selectedUser);
      setMessageInput("");
    }
  };
  const setSelectedUser = (selected) => {
    selectedUser.current = selected;
  };
  const handleSelected = (selected) => {
    if (selectedUser.current && selected.key === selectedUser.current.key)
      return;
    setSelectedUser(selected);
    setShowTextField(true);
  };
  const handleReceiveMessage = async (message, sender) => {
    setMessages((perv) => [...perv, { isSelf: false, message, sender }]);
    const selected = selectedUser.current;
    if (!selected || selectedUser.current.user.id !== sender.id) {
      handleAlertNewMessage(sender.name);
    }
  };
  const handleChatMessages = () => {
    if (!selectedUser.current) {
      return [];
    }
    if (Object.keys(selectedUser.current).length === 0) {
      return [];
    }
    const filtered = messages.filter(
      (message) =>
        message.sender.id === selectedUser.current.user.id ||
        (message.isSelf && message.sender.id === selectedUser.current.user.id)
    );
    return filtered;
  };

  const handleInvite = () => {
    userSocket.emit("sendInvite", selectedUser.current);
  };

  const handleGameInvite = (sender) => {
    setSender(sender);
    setOpenModal(true);
  };
  const handleGameAccepted = async (sender) => {
    gameSocket.connect();
    const self = await getUser();
    gameSocket.emit("mount", self.id, sender);
    navigate("/game");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: "40px",
            padding: "30px",
            height: " 60vh",
          }}
        >
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
                    height: "",
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
                {selectedUser.current && selectedUser.current.user
                  ? selectedUser.current.user.name
                  : ""}

                {selectedUser.current && selectedUser.current.user && (
                  <Button
                    endIcon={<CasinoIcon />}
                    onClick={handleInvite}
                    sx={{ marginLeft: "30px" }}
                  >
                    Play now
                  </Button>
                )}
              </Typography>
              <Box sx={{ height: "60vh", overflowY: "auto" }}>
                {handleChatMessages().map((data, index) =>
                  data.isSelf ? (
                    <MyChat key={index} data={JSON.stringify(data)} />
                  ) : (
                    <HisChat key={index} data={JSON.stringify(data)} />
                  )
                )}
                <div ref={messagesEndRef} />
              </Box>
              {showTextField && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    height: "auto",
                  }}
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
