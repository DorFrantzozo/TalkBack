import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CasinoIcon from "@mui/icons-material/Casino";
import IconButton from "@mui/material/IconButton";

import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleUpdateUsers = (onlineusers) => {
    if (onlineusers) {
      setOnlineUsers(onlineusers.filter((user) => user !== socket.id));
    }
    console.log(onlineUsers);
  };

  useEffect(() => {
    // socket.on("connect", () => setSocket(socket)); // Save socket instance to state    });
    socket.on("updateOnlineUsers", handleUpdateUsers);

    return () => {
      socket.off("updateOnlineUsers", handleUpdateUsers);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {onlineUsers.map((user) => (
          <ListItem
            key={user}
            disableGutters
            secondaryAction={
              <>
                <IconButton aria-label="Chat">
                  <ChatBubbleOutlineRoundedIcon />
                </IconButton>
                <IconButton aria-label="backgammon">
                  <CasinoIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={`Line item ${user}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default Home;
