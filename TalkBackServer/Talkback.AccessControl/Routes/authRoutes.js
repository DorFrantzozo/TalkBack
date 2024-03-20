import { Router } from "express";
import { getUsers, authenticaateToken } from "../utils/authJwt.js";
import authController from "../Controllers/authController.js";

const router = Router();

router.get("/users", authenticaateToken, async (req, res) => {
  console.log(req.user);
  const users = await getUsers(req, res);
  console.log(users);
  req.user;
  res.json(users.filter((user) => user.username === req.user.name));
});

//signup + asign accessToken and refreshToken
router.post("/signup", authController.signup_post);

//signin + asign accessToken and refreshToken
router.post("/signin", authController.signin_post);

// logout + delete refreshToken
router.delete("/logout", authController.logout_delete);

// get new accessToken
router.get("/token", authController.token_get);

export default router;