import { Router } from "express";
import chatController from "../controllers/handleChatController.js";

const router = Router();
router.post("/pushmessage", chatController.pushmessage_post);
export default router;
