import jwt from "jsonwebtoken";
export const refreshTokens = [];
export function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
export function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}
export function authenticaateAccessToken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) return res.sentStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sentStatus(403);
    req.user = user;
    next();
  });
}

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(404).send({ message: error.message });
//   }
// };
