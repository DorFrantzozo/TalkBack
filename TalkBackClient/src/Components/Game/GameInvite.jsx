import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import gameManager from "../../services/gameService";
import { AuthContext } from "../../context/authContext";
import { userSocket } from "../../services/userSocketService";
import { useNavigate } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
export default function AlertDialogSlide({ user, open, setOpen }) {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDisagreeToPlay = () => {
    setOpen(false);
  };
  const handleAgreeToPlay = () => {
    setOpen(false);
    gameManager.handleStartGame(user, auth.user);
    userSocket.emit("AcceptInvite", user);
    navigate("/game");
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${user.name} \n wants to play Backgramoon`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagreeToPlay}>Disagree</Button>
          <Button onClick={handleAgreeToPlay}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
