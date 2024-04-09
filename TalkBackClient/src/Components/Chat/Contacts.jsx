import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { OnlineBadge } from "../../assets/Themes/colors";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import { userSocket } from "../../services/userSocketService";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

// eslint-disable-next-line react/prop-types
export default function Contacts({ handleSelected }) {
  const auth = useContext(AuthContext);

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {Object.keys(auth.onlineUsers).length !== 0 ? (
        Object.keys(auth.onlineUsers).map((key) => (
          <ListItem
            key={key}
            disableGutters
            button
            onClick={() => handleSelected({ user: auth.onlineUsers[key], key })}
          >
            <ListItemAvatar>
              <OnlineBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
              </OnlineBadge>
            </ListItemAvatar>
            <ListItemText
              primary={auth.onlineUsers[key].name}
              secondary={"Tap here to start chat"}
            />
          </ListItem>
        ))
      ) : (
        <ListItem disableGutters>
          <ListItemText primary={"No one is Online"} />
        </ListItem>
      )}
    </List>
  );
}
