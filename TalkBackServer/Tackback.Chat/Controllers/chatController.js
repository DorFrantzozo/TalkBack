import axios from "axios";
const Online_API_URL = "http://localhost:3002";
const service = axios.create({
  baseURL: Online_API_URL,
});
const chatController = {
  async sendMessage_post(req, res) {
    const { message, receiver } = req.body;
  },
};
export default authController;
