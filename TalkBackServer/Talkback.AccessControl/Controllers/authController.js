import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//handle errors
const handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { username: "", password: "" };

  if (error.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }
  return errors;
};

export const refreshTokens = [];
export function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}
export function authenticaateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sentStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sentStatus(403);
    req.user = user;
    next();
  });
}
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const authController = {
  signup_post: async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log(username, password);
      const user = await User.create({ username, password });
      res.status(201).json(user);
    } catch (error) {
      handleErrors(error);
      res.status(400).send("error,user not created");
    }
  },
};
export default authController;
