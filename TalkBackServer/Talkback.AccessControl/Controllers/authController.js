import User from "../Models/userModel.js";
import Token from "../Models/refreshTokenModel.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/authJwt.js";
//handle errors
const handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { email: "", password: "" };

  if (error.message === "email doesnt exist") {
    errors.email = "that email doesnt registered";
  }
  if (error.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }
  if (error.code === 11000) {
    errors.email = "that email is already registered";
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
    const { email, password, firstName, lastName } = req.body;
    try {
      const user = await User.create({ email, password, firstName, lastName });
      console.log(user._id);
      const accessToken = generateAccessToken(user._id);
      console.log(accessToken);
      const refreshToken = generateRefreshToken(user._id);
      const newRefreshToken = new Token({
        token: refreshToken,
        user: user._id,
      });
      await newRefreshToken.save();
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
      const findTokenInDb = await Token.findOne({ user: user._id });
      if (!findTokenInDb) {
        const newRefreshToken = new Token({
          token: refreshToken,
          user: user._id,
        });
        await newRefreshToken.save();
      } else {
        let new_token = await Token.findOneAndUpdate(
          { user: user._id },
          { token: refreshToken },
          { new: true }
        );
      }
      // refreshTokens.push(refreshToken);

      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },
  async logout_delete(req, res) {
    try {
      await Token.findOneAndDelete({ token: req.body.token });
    } catch (error) {
      res.status(400).json("Token not found");
    }
    res.sendStatus(204).json("Success");
  },
  async token_get(req, res) {
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    const findRefreshToken = await Token.findOne({ token: refreshToken });
    if (!findRefreshToken)
      return res.sendStatus(403).json("Token has been expired.Sign in again");
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          console.log(err.message);
          return res.sendStatus(403);
        }
        const accessToken = generateAccessToken({ id: user._id });
        const newRefreshToken = generateRefreshToken(user._id);
        let new_token = await Token.findOneAndUpdate(
          { token: refreshToken },
          { token: newRefreshToken },
          { new: true }
        );
        res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: newRefreshToken });
      }
    );
  },
};
export default authController;
