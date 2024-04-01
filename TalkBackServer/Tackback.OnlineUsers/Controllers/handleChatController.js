import { handleSendMessage } from "../sockets/user/chatHandler.js";

const chatController = {
  async pushmessage_post(req, res) {
    try {
      const { message, receiver, senderid } = req.body;
      handleSendMessage(message, receiver, senderid);
      res.sendStatus(200);
    } catch (error) {
      // console.log("error" + error);
      res.sendStatus(401);
    }
  },
};
export default chatController;
