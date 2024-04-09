import axios from "axios";
import { toast } from "react-toastify";
import { AuthAccessToken } from "./authService";
import { userSocket } from "./userSocketService";
const CHAT_API_URL = "http://localhost:3002";
const service = axios.create({
  baseURL: CHAT_API_URL,
});
export const handleSendeMessage = async (messageInput, selectedUser) => {
  try {
    service.defaults.headers.common["Authorization"] = AuthAccessToken;
    const res = await service.post(
      "/sendmessage",
      {
        message: messageInput,
        receiver: selectedUser,
        senderid: userSocket.id,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return true;
  } catch (error) {
    console.log("message didnt Send" + error);
    return false;
  }
};
export const handleAlertNewMessage = async (sender) => {
  toast.info(`${sender} send you a message!`, {
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
