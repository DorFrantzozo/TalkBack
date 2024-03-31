import axios from "axios";
const CHAT_API_URL = "http://localhost:3002";
const service = axios.create({
  baseURL: CHAT_API_URL,
});
const handleSendeMessage = async (messageInput, selectedUser) => {
  await service
    .post(
      "/sendmessage",
      {
        message: messageInput,
        receiver: selectedUser,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then(console.log("message Send !!!"))
    .catch((error) => console.log("message didnt Send" + error));
};
