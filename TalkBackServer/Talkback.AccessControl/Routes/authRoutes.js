import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  refreshTokens,
  generateAccessToken,
  getUsers,
  authenticaateToken,
} from "../Controllers/authController.js";
import authController from "../Controllers/authController.js";

dotenv.config();

const router = Router();

router.get("/users", authenticaateToken, async (req, res) => {
  console.log(req.user);
  const users = await getUsers(req, res);
  console.log(users);
  req.user;
  res.json(users.filter((user) => user.username === req.user.name));
});

// delete refreshTokens
router.delete("/logout", (req, res) => {
  console.log(refreshTokens);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  console.log("after");
  console.log(refreshTokens);
  res.sendStatus(204);
});

// get new accessToken
router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

//login get username and asign accessToken and refreshToken

router.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  //TODO implement in client refreshToken in localstorage

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });

  //
});

//sign in

router.post("/signup", authController.signup_post);

export default router;
