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

export default function Contacts(props) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [selectedUser, setSelecteUser] = useState(null);

  const handleSelectedUser = (user) => {
    setSelecteUser(user);
    props.selectedUser(user);
    console.log(user);
  };

  const handleUpdateUsers = (onlineusers) => {
    console.log(onlineusers);

    if (onlineusers) {
      const filteredIds = Object.keys(onlineusers).filter(
        (id) => userSocket.id !== id
      );
      const filteredUsers = filteredIds.map((id) => onlineusers[id].name);
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
          onlineUsers.map((user, index) => (
            // eslint-disable-next-line react/jsx-key
            <Button onClick={() => handleSelectedUser(user)}>
              <ListItem key={index} disableGutters>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={user}
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
