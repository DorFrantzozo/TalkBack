import { Router } from "express";
import { authenticaateAccessToken } from "../utils/authJwt.js";
import authController from "../Controllers/authController.js";

const router = Router();

router.get("/user", authenticaateAccessToken, authController.user_get);

//signup + asign accessToken and refreshToken
router.post("/signup", authController.signup_post);

//signin + asign accessToken and refreshToken
router.post("/signin", authController.signin_post);

// logout + delete refreshToken
router.delete("/logout", authController.logout_delete);

// get new accessToken
router.put("/token", authController.token_put);

export default router;
