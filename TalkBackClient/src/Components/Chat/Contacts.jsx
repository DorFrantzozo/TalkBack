import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { userSocket } from "../../services/userSocketService";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function Contacts({ handleSelected }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleSelectedUser = (user) => {
    handleSelected(JSON.stringify(user));
    console.log(user);
  };

  const handleUpdateUsers = (onlineusers) => {
    console.log(onlineusers);

    if (onlineusers) {
      const filteredIds = Object.keys(onlineusers).filter(
        (id) => userSocket.id !== id
      );
      const filteredUsers = {};
      filteredIds.map((id, index) => {
        filteredUsers[index] = { id, name: onlineusers[id].name };

        console.log(index, filteredUsers[index]);
      });
      console.log(filteredUsers);
      setOnlineUsers(filteredUsers);
    }
  };

  useEffect(() => {
    userSocket.on("updateOnlineUsers", handleUpdateUsers);

    return () => {
      userSocket.off("updateOnlineUsers", handleUpdateUsers);
    };
  }, []);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {onlineUsers.length !== 0 ? (
          Object.values(onlineUsers).map((user, index) => (
            <Button key={index} onClick={() => handleSelectedUser(user)}>
              <ListItem key={index} disableGutters>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      {"Tap here to start chat"}
                      <Divider />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Button>
          ))
        ) : (
          <ListItem key={1} disableGutters>
            <ListItemText primary={"No one is Online"} />
          </ListItem>
        )}
      </List>
    </>
  );
}
