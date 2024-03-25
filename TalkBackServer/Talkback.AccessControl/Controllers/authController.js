import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
} from "../utils/authJwt.js";
//handle errors
const handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { username: "", password: "" };

  if (error.message === "Username doesnt exist") {
    errors.username = "that username doesnt registered";
  }
  if (error.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }
  if (error.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const authController = {
  async signup_post(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      console.log(user._id);
      const accessToken = generateAccessToken(user._id);
      console.log(accessToken);
      const refreshToken = generateRefreshToken(user._id);
      refreshTokens.push(refreshToken);
      res
        .status(201)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).send({ errors });
    }
  },
  async signin_post(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.signin(email, password);
      const accessToken = generateAccessToken(user._id);
      console.log(accessToken);
      const refreshToken = generateRefreshToken(user._id);
      refreshTokens.push(refreshToken);

      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },
  async logout_delete(req, res) {
    console.log(refreshTokens);
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    console.log("after");
    console.log(refreshTokens);
    res.sendStatus(204);
  },
  async token_get(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err.message);
        return res.sendStatus(403);
      }
      const accessToken = generateAccessToken({ id: user._id });
      res.json({ accessToken: accessToken });
    });
  },
};
export default authController;
