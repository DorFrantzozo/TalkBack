import { Router } from "express";
import gameEventsController from "../controllers/gameEventsController.js";

const router = Router();
router.post("/sendOpponentGame", gameEventsController.sendOpponentGame_post);
router.post("/chooseSquare", gameEventsController.chooseSquare_post);
router.post("/endGame", gameEventsController.endGame_post);

export default router;
