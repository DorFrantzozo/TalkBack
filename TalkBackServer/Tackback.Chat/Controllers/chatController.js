import axios from "axios";
const Online_API_URL = "http://localhost:3001";
const service = axios.create({
  baseURL: Online_API_URL,
});
const chatController = {
  async sendMessage_post(req, res) {
    const { message, receiver } = req.body;
    try {
      const response = await service.post("/pushmessage", {
        message,
        receiver,
        senderid: req.userid,
      });
      res.status(200).json({ error: "Success message send" });
    } catch (error) {
      // console.log(error);
      res.status(401).json({ error: "Failed to send message" }); // Send error response to client
    }
  },
};
export default chatController;
