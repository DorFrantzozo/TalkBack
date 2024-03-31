import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { OnlineBadge } from "../../assets/Themes/colors";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// import { userSocket } from "../../services/userSocketService";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Contacts({ handleSelected }) {
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const auth = useContext(AuthContext);
  const handleSelectedUser = (user, key) => {
    handleSelected(JSON.stringify({ user, key }));
    console.log(user, key);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {auth.onlineUsers.length !== 0 ? (
          Object.keys(auth.onlineUsers).map((key, index) => (
            <Button
              key={index}
              onClick={() => handleSelectedUser(auth.onlineUsers[key], key)}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                maxWidth: 360,
              }}
            >
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
                  primary={auth.onlineUsers[key].name}
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
