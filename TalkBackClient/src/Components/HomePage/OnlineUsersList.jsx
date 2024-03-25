import List from "@mui/material/List";
import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CasinoIcon from "@mui/icons-material/Casino";
import IconButton from "@mui/material/IconButton";
import { socket } from "../../utils/Socket";
const OnlineUsersList = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleUpdateUsers = (onlineusers) => {
    if (onlineusers) {
      setOnlineUsers(onlineusers.filter((user) => user !== socket.id));
      console.log(onlineusers.filter((user) => user !== socket.id).length);
    }
  };

  useEffect(() => {
    socket.on("updateOnlineUsers", handleUpdateUsers);

    return () => {
      socket.off("updateOnlineUsers", handleUpdateUsers);
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {onlineUsers.length !== 0 ? (
          onlineUsers.map((user) => (
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
          ))
        ) : (
          <ListItem key={1} disableGutters>
            <ListItemText primary={"No one is Online"} />
          </ListItem>
        )}
      </List>
    </>
  );
};
export default OnlineUsersList;
