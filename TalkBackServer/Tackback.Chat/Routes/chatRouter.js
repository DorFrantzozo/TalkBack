import { Router } from "express";
import chatController from "../Controllers/chatController.js";
import { userAuthentication } from "../middleware/chatMiddleware.js";
const router = Router();

router.post(
  "/sendmessage",
  userAuthentication,
  chatController.sendMessage_post
);

export default router;
