import { Router } from "express";
import { userAuthentication } from "../middleware/gameMiddleware.js";
import gameController from "../controllers/gameController.js";
const router = Router();
router.post("/startgame", userAuthentication, gameController.startGame_post);
router.post(
  "/chooseSquare",
  userAuthentication,
  gameController.chooseSquare_post
);

export default router;
