import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { OnlineBadge } from "../../assets/Themes/colors";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { userSocket } from "../../services/userSocketService";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AlertNewUser from "./designCOmponent/AlertNewUser";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
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
        alertLogIn(filteredUsers[index]);
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

  const alertLogIn = (user) => {
    toast.success(`${user.name} is online`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <AlertNewUser />
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {onlineUsers.length !== 0 ? (
          Object.values(onlineUsers).map((user, index) => (
            <Button key={index} onClick={() => handleSelectedUser(user)}>
              <ListItem key={index} disableGutters>
                <ListItemAvatar>
                  <OnlineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </OnlineBadge>
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
                      >
                        {"Tap here to start chat"}
                      </Typography>
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
