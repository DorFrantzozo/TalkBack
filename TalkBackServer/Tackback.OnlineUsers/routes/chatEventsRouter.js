import { Router } from "express";
import chatEventsController from "../controllers/chatEventsController.js";

const router = Router();
router.post("/pushmessage", chatEventsController.pushmessage_post);
export default router;
