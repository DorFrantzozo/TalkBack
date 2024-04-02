import axios from "axios";
const AUTH_API_URL = "http://localhost:3000";
const auth = axios.create({
  baseURL: AUTH_API_URL,
});
export const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  auth.defaults.headers.common["authorization"] = `Bearer ${token}`;
  const response = await auth.get("/user");
  req.userid = response.data.id;
  next();
};
